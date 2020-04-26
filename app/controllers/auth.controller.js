const Auth = require("../models/auth.model");

// Login
exports.login = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const auth = new Auth({ email: req.body.email, password: req.body.password });

  Auth.login(auth, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while login."
      });
    else res.send(data);
  });
};
