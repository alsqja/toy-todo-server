const models = require("../models");

module.exports = {
  signup: {
    post: (req, res) => {
      models.signup.post(
        req.body.name,
        req.body.email,
        req.body.password,
        (err, result) => {
          if (err) {
            res.status(400).json(err);
          } else {
            res.status(201).json(result);
          }
        }
      );
    },
  },
  signin: {
    post: (req, res) => {
      models.signin.post(req.body.email, req.body.password, (err, result) => {
        if (err) {
          res.status(404).json(err);
        } else {
          res.status(200).json(result);
        }
      });
    },
  },
  todo: {
    post: (req, res) => {
      const user_id = req.params.user_id;
      const { contents, expiration_date } = req.body;

      if (!user_id) {
        return res.status(401).send("Unauthorized");
      }
      models.todo.post(
        Number(user_id),
        contents,
        expiration_date,
        (err, result) => {
          if (err) {
            res.status(403).json(err);
          } else {
            res.status(201).json(result);
          }
        }
      );
    },
    get: (req, res) => {
      const user_id = req.params.user_id;
      const { page, cursor, expiration_date, is_done, filter } = req.query;
      const data = { user_id, page, cursor, expiration_date, is_done };
      models.todo.get(filter, data, (err, result) => {
        if (err) {
          res.status(401).send("Unauthorized");
        } else {
          res.status(200).json(result);
        }
      });
    },
    put: (req, res) => {
      const todo_id = req.params.todo_id;
      const user_id = req.params.user_id;
      const { contents, expiration_date, is_done } = req.body;
      const data = { contents, expiration_date, is_done };
      models.todo.put(todo_id, user_id, data, (err, result) => {
        if (err) {
          console.log(err);
          res.status(401).send("Ua");
        } else {
          res.status(200).json(result);
        }
      });
    },
    delete: (req, res) => {
      const todo_id = req.params.todo_id;
      const user_id = req.params.user_id;
      models.todo.delete(todo_id, user_id, (err, result) => {
        if (err) {
          res.status(401).send("Ua");
        } else {
          res.status(204).send("No Content");
        }
      });
    },
  },
  user: {
    getData: (req, res) => {
      const user_id = req.params.user_id;
      models.user.getData(user_id, (err, result) => {
        if (err) {
          res.status(401).send("Unauthorized");
        } else {
          res.status(200).json(result);
        }
      });
    },
    get: (req, res) => {
      const user_id = req.params.user_id;
      models.user.get(user_id, (err, result) => {
        if (err) {
          res.status(401).send("Unauthorized");
        } else {
          res.status(200).json(result);
        }
      });
    },
    put: (req, res) => {
      const user_id = req.params.user_id;
      const { name, old_password, password } = req.body;
      models.user.put(user_id, name, old_password, password, (err, result) => {
        if (err) {
          res.status(401).json(err);
        } else {
          res.status(200).json(result);
        }
      });
    },
    delete: (req, res) => {
      const user_id = req.params.user_id;
      models.user.delete(user_id, (err, result) => {
        if (err) {
          res.status(401).json(err);
        } else {
          res.status(204).send("No Content");
        }
      });
    },
  },
};
