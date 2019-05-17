"use strict";

//server/server.js
// @TODO add env capability to add layer of abstraction bw app and private info
var express = require('express');

var router = require('./routes/routes.js');

var path = require('path');

var app = express();

var MongoClient = require('mongodb').MongoClient;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../client'));
app.use(express["static"](path.join(__dirname, '../client'))); // const RideController = require("../client/controllers/RideController.ts");

app.use('/', router); // app.use('/', RideController.router);

var uri = "mongodb+srv://sababa:021967@cluster0-ffkg5.azure.mongodb.net/test?retryWrites=true"; // const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`;

var client = new MongoClient(uri, {
  useNewUrlParser: true
});
client.connect(function () {
  var driversCollection = client.db("Users").collection("Drivers");
  driversCollection.insertOne({
    firstName: "Saba",
    lastName: "Imran"
  });
  console.log("test connection to the client"); // perform actions on the collection object

  client.close();
});
console.log("connected to mongo client");
module.exports = app;