module.exports = (app) => {
  const groups = require("../controllers/group.controller");

  // Create a new account
  app.post("/api/v1/groups", groups.create);

  app.get("/api/v1/groups", groups.findAll);

  app.get("/api/v1/groups/:managerId", groups.loadMember);

  // Update a group with groupId
  app.put("/api/v1/groups/:groupId", groups.update);

  // Delete a account with accountId
  app.delete("/api/v1/groups/:groupId", groups.delete);
};
