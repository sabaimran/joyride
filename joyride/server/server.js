//server/server.js
const express = require('express');
const router = require('./routes/routes.js')
const path = require('path');
const app = express();
const MongoClient = require('mongodb').MongoClient;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../client'));
app.use(express.static(path.join(__dirname, '../client')));
app.use('/', router);

const uri = "mongodb+srv://sababa:021967@cluster0-ffkg5.azure.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

console.log("connected to mongo client");

module.exports=app;
