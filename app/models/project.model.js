const sql = require("./db");

//constructor
//must be normal function. not arrow function
const Project = function(project) {
  this.name = project.name;
  this.description = project.description;
  this.date = project.date;
  this.due = project.due;
  this.creator = project.creator;
  this.assignee = project.assignee;
};

Project.create = (newProject, result) => {
  sql.query("INSERT INTO project SET ?", newProject, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    console.log("Created project: ", { id: res.insertId, ...newProject });
    result(null, { id: res.insertId, ...newProject });
  });
};

Project.findById = (projectId, result) => {
  sql.query(`SELECT * FROM project WHERE id = ${projectId}`, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Found project: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found project with the id
    result({ kind: "not_found" }, null);
  });
};

Project.getAll = result => {
  sql.query("SELECT * FROM project", (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    console.log("projects: ", res);
    result(null, res);
  });
};

Project.updateById = (id, project, result) => {
  sql.query(
    "UPDATE project SET name = ?, description = ?, due = ?, assignee = ? WHERE id = ?",
    [project.name, project.description, project.due, project.assignee, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found project with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Updated project: ", { id: id, ...project });
      result(null, { id: id, ...project });
    }
  );
};

Project.remove = (id, result) => {
  sql.query("DELETE FROM project WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found project with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("Deleted project with id: ", id);
    result(null, res);
  });
};

Project.removeAll = result => {
  sql.query("DELETE FROM project", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} projects`);
    result(null, res);
  });
};

module.exports = Project;
