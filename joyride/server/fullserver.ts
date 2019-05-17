//server/server.js
var App = require("./app").default;
var RideController = require("./controllers/RideController").default;

const rideRouter = new RideController();
console.log("trying to initialize routes but not working");

const app = new App (
  [
    rideRouter
  ],
);

// module.exports = app;
app.listen();
