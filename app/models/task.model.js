const sql = require("./db");

//constructor
const Task = function(task) {
  this.projectId = task.projectId;
  this.source = task.source;
  this.name = task.name;
  this.detail = task.detail;
  this.status = task.status;
  this.date = task.date;
  this.due = task.due;
  this.creator = task.creator;
  this.assignee = task.assignee;
  this.request = task.request;
  this.commitDate = task.commitDate;
  this.commitNote = task.commitNote;
  this.attachment = task.attachment;
  this.mark = task.mark;
  this.comment = task.comment;
  this.commentDate = task.commentDate;
  this.updated = task.updated;
  this.updatedBy = task.updatedBy;
};

Task.create = (newTask, result) => {
  console.log(newTask);
  sql.query("INSERT INTO task SET ?", newTask, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    console.log("Created task: ", { id: res.insertId, ...newTask });
    result(null, { id: res.insertId, ...newTask });
  });
};

Task.findById = (taskId, result) => {
  sql.query(`SELECT * FROM task WHERE id = ${taskId}`, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Found task: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found account with the id
    result({ kind: "not_found" }, null);
  });
};

Task.getAll = result => {
  sql.query("SELECT * FROM task", (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    console.log("tasks: ", res);
    result(null, res);
  });
};

Task.updateById = (id, task, result) => {
  sql.query(
    "UPDATE task SET name = ?, detail = ?, " +
      "status = ?, due = ?, assignee = ?, commitDate = ?, " +
      "commitNote = ?, attachment = ?, mark = ?, comment = ?, " +
      "commentDate = ?, updated = ?, updatedBy = ? WHERE id = ?",
    [
      task.name,
      task.detail,
      task.status,
      task.due,
      task.assignee,
      task.commitDate,
      task.commitNote,
      task.attachment,
      task.mark,
      task.comment,
      task.commentDate,
      task.updated,
      task.updatedBy,
      id
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Task with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Updated task: ", { id: id, ...task });
      result(null, { id: id, ...task });
    }
  );
};

Task.remove = (id, result) => {
  sql.query("DELETE FROM task WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Task with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("Deleted task with id: ", id);
    result(null, res);
  });
};

Task.removeAll = result => {
  sql.query("DELETE FROM task", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} tasks`);
    result(null, res);
  });
};

Task.acceptRequest = (id, request, result) => {
  sql.query(`UPDATE task set request=${request} WHERE id=${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`accept/decline ${res.affectedRows} tasks`);
    result(null, res);
  });
};

module.exports = Task;
