const Task = require("../models/task.model");

// Create and Save a new Task
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create an task
  const task = new Task({
    projectId: req.body.projectId,
    source: req.body.source,
    name: req.body.name,
    detail: req.body.detail,
    status: req.body.status,
    date: req.body.date,
    due: req.body.due,
    creator: req.body.creator,
    assignee: req.body.assignee,
    request: req.body.request,
    commitDate: req.body.commitDate,
    commitNote: req.body.commitNote,
    attachment: req.body.attachment,
    mark: req.body.mark,
    comment: req.body.mark,
    commentDate: req.body.commentDate
  });

  // Save task in the database
  Task.create(task, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the task."
      });
    else res.send(data);
  });
};

// Retrieve all tasks from the database.
exports.findAll = (req, res) => {
  Task.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving tasks."
      });
    else res.send(data);
  });
};

// Find a single Task with taskId
exports.findOne = (req, res) => {
  Task.findById(req.params.taskId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found task with id ${req.params.taskId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving task with id " + req.params.taskId
        });
      }
    } else res.send(data);
  });
};

// Update a Task identified by the taskId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Task.updateById(req.params.taskId, new Task(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found task with id ${req.params.taskId}.`
        });
      } else {
        res.status(500).send({
          message: "Error updating task with id " + req.params.taskId
        });
      }
    } else res.send(data);
  });
};

// Delete a task with the specified taskId in the request
exports.delete = (req, res) => {
  Task.remove(req.params.taskId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found task with id ${req.params.taskId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete task with id " + req.params.taskId
        });
      }
    } else res.send({ message: `Task was deleted successfully!` });
  });
};

// Delete all Projects from the database.
exports.deleteAll = (req, res) => {
  Task.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while removing all tasks."
      });
    else res.send({ message: `All tasks were deleted successfully!` });
  });
};

exports.acceptRequest = (req, res) => {
  Task.acceptRequest(req.params.taskId, req.body.request, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while accept tasks."
      });
    else res.send({ message: `Request was acepted successfully!` });
  });
};
