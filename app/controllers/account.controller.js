const Account = require("../models/account.model");

// Create and Save a new Account
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create an Account
  const account = new Account({
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
    name: req.body.name,
    avatar: req.body.avatar,
    active: req.body.active,
    memberId: req.body.memberId
  });

  // Save Account in the database
  Account.create(account, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    else res.send(data);
  });
};

// Retrieve all Accounts from the database.
exports.findAll = (req, res) => {
  Account.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
  });
};

// Find a single Account with a accountId
exports.findOne = (req, res) => {
  Account.findById(req.params.accountId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Account with id ${req.params.accountId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Account with id " + req.params.accountId
        });
      }
    } else res.send(data);
  });
};

// Update a Account identified by the accountId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Account.updateById(
    req.params.accountId,
    new Account(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Account with id ${req.params.accountId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Customer with id " + req.params.accountId
          });
        }
      } else res.send(data);
    }
  );
};

// Deactivate a Account with the specified accountId in the request
exports.deactivate = (req, res) => {
  Account.deactivate(req.params.accountId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Account with id ${req.params.accountId}.`
        });
      } else {
        res.status(500).send({
          message:
            "Could not deactivate Account with id " + req.params.accountId
        });
      }
    } else res.send({ message: `Account was deactivated successfully!` });
  });
};

// Delete a Account with the specified accountId in the request
exports.delete = (req, res) => {
  Account.remove(req.params.accountId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Account with id ${req.params.accountId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Account with id " + req.params.accountId
        });
      }
    } else res.send({ message: `Account was deleted successfully!` });
  });
};

// Delete all Accounts from the database.
exports.deleteAll = (req, res) => {
  Account.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all accounts."
      });
    else res.send({ message: `All accounts were deleted successfully!` });
  });
};
