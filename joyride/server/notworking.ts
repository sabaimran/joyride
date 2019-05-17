//server/server.js
var App = require("./app").default;
var RideController = require("./controllers/RideController").default;

const app = new App (
  [
    new RideController()
  ],
);

// module.exports = app;
app.listen();
