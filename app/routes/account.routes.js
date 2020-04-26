module.exports = (app) => {
  const accounts = require("../controllers/account.controller");

  // Create a new account
  app.post("/api/v1/accounts", accounts.create);

  // Retrieve all accounts
  app.get("/api/v1/accounts", accounts.findAll);

  // Retrieve a single account with accountId
  app.get("/api/v1/accounts/:accountId", accounts.findOne);

  // Update a account with accountId
  app.put("/api/v1/accounts/:accountId", accounts.update);

  // Update a account with accountId
  app.put("/api/v1/accounts/d/:accountId", accounts.deactivate);

  // Delete a account with accountId
  app.delete("/api/v1/accounts/:accountId", accounts.delete);

  // Delete all accounts
  app.delete("/api/v1/accounts", accounts.deleteAll);
};
