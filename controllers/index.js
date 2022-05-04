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
};
