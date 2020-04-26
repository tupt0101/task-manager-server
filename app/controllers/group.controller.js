const Group = require("../models/group.model");

// Create and Save a new Group
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create an Group
  const group = new Group({
    name: req.body.name,
    managerId: req.body.managerId,
    memberId: req.body.memberId
  });

  // Save Group in the database
  Group.create(group, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Group."
      });
    else res.send(data);
  });
};

// Retrieve all Groups from the database.
exports.findAll = (req, res) => {
  Group.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving groups."
      });
    else res.send(data);
  });
};

exports.loadMember = (req, res) => {
  Group.loadMember(req.params.managerId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Account with id ${req.params.managerId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Account with id " + req.params.managerId
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Group.updateById(req.params.groupId, new Group(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Group with id ${req.params.groupId}.`
        });
      } else {
        res.status(500).send({
          message: "Error updating Group with id " + req.params.groupId
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  Group.remove(req.params.groupId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Group with id ${req.params.groupId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Group with id " + req.params.groupId
        });
      }
    } else res.send({ message: `Group was deleted successfully!` });
  });
};
