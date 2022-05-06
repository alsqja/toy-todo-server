const db = require("../db");
const { todayMaker } = require("../function/time");

module.exports = {
  signup: {
    post: (name, email, password, callback) => {
      const checkQuery = `SELECT * FROM users WHERE email='${email}'`;

      db.query(checkQuery, (err, result) => {
        console.log(result);
        if (result.length > 0) {
          callback("이미 가입된 이메일 입니다.", result);
        } else {
          const checkQuery = `SELECT * FROM users WHERE name='${name}'`;

          db.query(checkQuery, (err, result) => {
            if (result.length > 0) {
              callback("이미 존재하는 닉네임 입니다.", result);
            } else {
              const queryString = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
              const params = [name, email, password];

              db.query(queryString, params, (err, result) => {
                if (result) {
                  const queryString = `SELECT * FROM users WHERE email='${email}'`;

                  return db.query(queryString, (err, result) => {
                    const resData = result[0];
                    delete resData.password;
                    callback(err, resData);
                  });
                }
                callback(err, result);
              });
            }
          });
        }
      });
    },
  },
  signin: {
    post: (email, password, callback) => {
      const queryString = `SELECT * FROM users WHERE email='${email}' AND password='${password}'`;
      db.query(queryString, (err, result) => {
        if (result.length > 0) {
          const resData = result[0];
          delete resData.password;
          callback(err, resData);
        } else {
          callback("잘못된 아이디 혹은 비밀번호 입니다.", result);
        }
      });
    },
  },
  todo: {
    post: (user_id, contents, expiration_date, callback) => {
      const queryString = `INSERT INTO todos (user_id, contents, expiration_date, is_done) VALUES (?, ?, ?, ?)`;
      const params = [user_id, contents, expiration_date, false];

      db.query(queryString, params, (err, result) => {
        callback(err, result);
      });
    },
    get: (filter, data, callback) => {
      if (filter === "all") {
        const queryString = `SELECT * FROM todos WHERE user_id='${
          data.user_id
        }' AND is_done='${false}' ORDER BY created_at DESC`;
        db.query(queryString, (err, result) => {
          result = result.filter(
            (todo) => +todo.expiration_date >= new Date(todayMaker()).getTime()
          );
          callback(err, result.slice(data.page * 15, data.page * 15 + 15));
        });
      } else if (filter === "today") {
        const queryString = `SELECT * FROM todos WHERE user_id='${
          data.user_id
        }' AND is_done='${false}' AND expiration_date='${
          data.expiration_date
        }' ORDER BY created_at DESC`;
        db.query(queryString, (err, result) => {
          result = result.filter(
            (todo) => +todo.expiration_date >= new Date(todayMaker()).getTime()
          );
          callback(err, {
            todos: result.slice(data.page * 10, data.page * 10 + 10),
            pageNum: Math.ceil(result.length / 10),
          });
        });
      }
    },
  },
};
