//server/fullserver.js
import 'dotenv/config';

var App = require("./app").default;
// path is relative to the JS files in /lib
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
