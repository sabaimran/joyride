//server/server.js

// @TODO add env capability to add layer of abstraction bw app and private info

const express = require('express');
const router = require('./routes/routes.js')
const path = require('path');
const app = express();
const MongoClient = require('mongodb').MongoClient;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../client'));
app.use(express.static(path.join(__dirname, '../client')));

// const RideController = require("../client/controllers/RideController.ts");
app.use('/', router);
// app.use('/', RideController.router);

const uri = "mongodb+srv://sababa:021967@cluster0-ffkg5.azure.mongodb.net/test?retryWrites=true";
// const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`;
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(() => {
  const driversCollection = client.db("Users").collection("Drivers");
  driversCollection.insertOne({
    firstName: "Saba",
    lastName: "Imran"
  })
  console.log("test connection to the client");
  // perform actions on the collection object
  client.close();
});

console.log("connected to mongo client");

app.listen(3000, () => {
  console.log("listening at 3000");
});
