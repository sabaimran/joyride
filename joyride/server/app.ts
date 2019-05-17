// import * as bodyParser from 'body-parser';
// import * as express from 'express';
// import * as mongoose from 'mongoose';
// import Controller from '../client/interfaces/IController';

const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const path = require('path');
const MongoClient = require('mongodb').MongoClient;

class App {

    // public app: express.Application;
    public app;

  constructor(controllers) {
    this.app = express();

    this.connectToTheDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    // this.initializeErrorHandling();
  }
  
  initializeMiddlewares() {
    this.app.set('view engine', 'ejs');
    this.app.set('views', path.join(__dirname, '../client'));
    this.app.use(express.static(path.join(__dirname, '../client')));
    this.app.use(bodyParser.json());
  }

  listen() {
    this.app.listen(8000, () => {
      console.log("listening to port 8000");
    });
  }

//   private initializeErrorHandling() {
//     this.app.use(errorMiddleware);
//   }

  initializeControllers(controllers) {
    console.log('init routers');
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
    
    var router = express.Router();
    router.get('*', function(req, res) {
      res.render('index');
    })
    this.app.use('/', router);
  }

  connectToTheDatabase() {
    // const {
    //   MONGO_USER,
    //   MONGO_PASSWORD,
    //   MONGO_PATH,
    // } = process.env;
    // mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`);
    const uri = "mongodb+srv://sababa:021967@cluster0-ffkg5.azure.mongodb.net/test?retryWrites=true";
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
  }
}

export default App;