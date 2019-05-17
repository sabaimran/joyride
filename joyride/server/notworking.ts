//server/server.js
var App = require("./app.ts");
var RideController = require("../client/controllers/RideController");

const app = new App (
  [
    new RideController()
  ],
);

module.exports = app;
