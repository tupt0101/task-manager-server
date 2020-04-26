const sql = require("./db");

// Constructor
const Auth = function(auth) {
  this.email = auth.email;
  this.password = auth.password;
};

Auth.login = (auth, result) => {
  sql.query(
    `SELECT * FROM account WHERE email = '${auth.email}' AND password = '${auth.password}' AND active = 1`,
    (err, res) => {
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
    }
  );
};

module.exports = Auth;
