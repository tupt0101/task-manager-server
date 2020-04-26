const sql = require("./db");

//constructor
const Group = function(group) {
  this.name = group.name;
  this.managerId = group.managerId;
  this.memberId = group.memberId;
};

Group.create = (newGroup, result) => {
  console.log(newGroup);
  sql.query(
    `CALL createGroup('${newGroup.name}',${newGroup.managerId},${newGroup.memberId})`,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }

      console.log("Created group: ", { id: res.insertId, ...newGroup });
      result(null, { id: res.insertId, ...newGroup });
    }
  );
};

Group.getAll = result => {
  sql.query("SELECT * FROM groups", (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    console.log("groups: ", res);
    result(null, res);
  });
};

Group.loadMember = (managerId, result) => {
  sql.query(
    `SELECT memberId FROM groups WHERE managerId=${managerId}`,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("Found member: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found account with the id
      result({ kind: "not_found" }, null);
    }
  );
};

Group.updateById = (id, group, result) => {
  sql.query(
    "UPDATE groups SET name = ?, managerId = ?, memberId= ? WHERE id = ?",
    [group.name, group.managerId, group.memberId, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Account with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Updated group: ", { id: id, ...group });
      result(null, { id: id, ...group });
    }
  );
};

Group.remove = (id, result) => {
  sql.query("DELETE FROM groups WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Account with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("Deleted group with id: ", id);
    result(null, res);
  });
};

module.exports = Group;
