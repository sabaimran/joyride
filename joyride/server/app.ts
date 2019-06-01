// import * as bodyParser from 'body-parser';
// import * as express from 'express';
// import * as mongoose from 'mongoose';
// import Controller from '../client/interfaces/IController';

const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const path = require('path');
const cookieParser = require('cookie-parser');

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
  
  private initializeMiddlewares() {
    this.app.set('view engine', 'ejs');
    this.app.set('views', path.join(__dirname, '../client'));
    this.app.use(express.static(path.join(__dirname, '../client')));
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
  }

  public getServer() {
    console.log('got server');
    return this.app;
  }

  listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`listening to port ${process.env.PORT}`);
    });
  }

//   private initializeErrorHandling() {
//     this.app.use(errorMiddleware);
//   }

  private initializeControllers(controllers) {
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

  private connectToTheDatabase() {
    const {
      MONGO_USER,
      MONGO_PASSWORD,
      MONGO_PATH,
    } = process.env;
    // mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`);

    
    const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`;
    // mongoose way
    mongoose.connect(uri, {useNewUrlParser: true});
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
      console.log("successfully connected");
    });
    

    // mongodb way
    // const client = new MongoClient(uri, { useNewUrlParser: true });
    // client.connect(() => {
    //   const driversCollection = client.db("Rides").collection("ChampaignToChicago");
    //   driversCollection.insertOne({
    //     firstName: "Saba",
    //     lastName: "Imran",
    //     date: new Date(),
    //     destination: "Union",
    //     departure: "Champaign",
    //     category: "ChampaigntoChicago"
    //   })
    //   console.log("test connection to the client");
    //   // perform actions on the collection object
    //   // client.close();
    // });
  }
}

export default App;