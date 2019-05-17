// import * as bodyParser from 'body-parser';
// import * as express from 'express';
// import * as mongoose from 'mongoose';
// import Controller from '../client/interfaces/IController';

var bodyParser = require("body-parser");
var express = require("express");
var mongoose = require("mongoose");

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
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }

  connectToTheDatabase() {
    // const {
    //   MONGO_USER,
    //   MONGO_PASSWORD,
    //   MONGO_PATH,
    // } = process.env;
    // mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`);
    const uri = "mongodb+srv://sababa:021967@cluster0-ffkg5.azure.mongodb.net/test?retryWrites=true";
    mongoose.connect(uri);
    console.log("connected to mongooose");
  }
}

export default App;