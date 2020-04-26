module.exports = (app) => {
  const tasks = require("../controllers/task.controller");

  // Create a new task
  app.post("/api/v1/tasks", tasks.create);

  // Retrieve all tasks
  app.get("/api/v1/tasks", tasks.findAll);

  // Retrieve a single task with taskId
  app.get("/api/v1/tasks/:taskId", tasks.findOne);

  // Update a task with taskId
  app.put("/api/v1/tasks/:taskId", tasks.update);

  // Delete a task with taskId
  app.delete("/api/v1/tasks/:taskId", tasks.delete);

  // Delete all tasks
  app.delete("/api/v1/tasks", tasks.deleteAll);

  // Accept/Decline request task
  app.put("/api/v1/tasks/r/:taskId", tasks.acceptRequest);
};
