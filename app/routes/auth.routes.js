module.exports = (app) => {
  const auth = require("../controllers/auth.controller");

  // Login
  app.post("/api/v1/auth", auth.login);
};
