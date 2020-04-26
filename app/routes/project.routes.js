module.exports = (app) => {
  const projects = require("../controllers/project.controller");

  // Create a new project
  app.post("/api/v1/projects", projects.create);

  // Retrieve all projects
  app.get("/api/v1/projects", projects.findAll);

  // Retrieve a single account with projectId
  app.get("/api/v1/projects/:projectId", projects.findOne);

  // Update a account with projectId
  app.put("/api/v1/projects/:projectId", projects.update);

  // Delete a account with projectId
  app.delete("/api/v1/projects/:projectId", projects.delete);

  // Delete all projects
  app.delete("/api/v1/projects", projects.deleteAll);
};
