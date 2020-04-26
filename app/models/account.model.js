const sql = require("./db");

//constructor
const Account = function(account) {
  this.email = account.email;
  this.password = account.password;
  this.role = account.role;
  this.name = account.name;
  this.avatar = account.avatar;
  this.active = account.active;
  this.memberId = account.memberId;
};

Account.create = (newAccount, result) => {
  sql.query("INSERT INTO account SET ?", newAccount, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    console.log("Created account: ", { id: res.insertId, ...newAccount });
    result(null, { id: res.insertId, ...newAccount });
  });
};

Account.findById = (accountId, result) => {
  sql.query(`SELECT * FROM account WHERE id = ${accountId}`, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Found account: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found account with the id
    result({ kind: "not_found" }, null);
  });
};

Account.getAll = result => {
  sql.query("SELECT * FROM account WHERE active = 1", (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    console.log("accounts: ", res);
    result(null, res);
  });
};

Account.updateById = (id, account, result) => {
  sql.query(
    "UPDATE account SET email = ?, password = ?, role= ?, name = ?, avatar= ?, active = ? WHERE id = ?",
    [
      account.email,
      account.password,
      account.role,
      account.name,
      account.avatar,
      account.active,
      id
    ],
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

      console.log("Updated account: ", { id: id, ...account });
      result(null, { id: id, ...account });
    }
  );
};

Account.deactivate = (id, result) => {
  sql.query(`UPDATE account SET active = 0 WHERE id =${id}`, (err, res) => {
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

    console.log("Deactivated account: ", { id: id });
    result(null, { id: id });
  });
};

Account.remove = (id, result) => {
  sql.query("DELETE FROM account WHERE id = ?", id, (err, res) => {
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

    console.log("Deleted account with id: ", id);
    result(null, res);
  });
};

Account.removeAll = result => {
  sql.query("DELETE FROM account", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} accounts`);
    result(null, res);
  });
};

module.exports = Account;
