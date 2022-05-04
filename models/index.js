const db = require("../db");

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
};
