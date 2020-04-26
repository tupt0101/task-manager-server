const Project = require("../models/project.model");

// Create and Save a new Project
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create an project
  const project = new Project({
    name: req.body.name,
    description: req.body.description,
    date: req.body.date,
    due: req.body.due,
    creator: req.body.creator,
    assignee: req.body.assignee
  });

  // Save project in the database
  Project.create(project, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the project."
      });
    else res.send(data);
  });
};

// Retrieve all projects from the database.
exports.findAll = (req, res) => {
  Project.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving projects."
      });
    else res.send(data);
  });
};

// Find a single Project with a projectId
exports.findOne = (req, res) => {
  Project.findById(req.params.projectId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found project with id ${req.params.projectId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving project with id " + req.params.projectId
        });
      }
    } else res.send(data);
  });
};

// Update a Project identified by the projectId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Project.updateById(
    req.params.projectId,
    new Project(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found project with id ${req.params.projectId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating project with id " + req.params.projectId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Account with the specified projectId in the request
exports.delete = (req, res) => {
  Project.remove(req.params.projectId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found project with id ${req.params.projectId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete project with id " + req.params.projectId
        });
      }
    } else res.send({ message: `Project was deleted successfully!` });
  });
};

// Delete all Projects from the database.
exports.deleteAll = (req, res) => {
  Project.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all projects."
      });
    else res.send({ message: `All projects were deleted successfully!` });
  });
};
