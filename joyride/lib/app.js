"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// import * as bodyParser from 'body-parser';
// import * as express from 'express';
// import * as mongoose from 'mongoose';
// import Controller from '../client/interfaces/IController';
var bodyParser = require("body-parser");

var express = require("express");

var mongoose = require("mongoose");

var App =
/*#__PURE__*/
function () {
  // public app: express.Application;
  function App(controllers) {
    _classCallCheck(this, App);

    _defineProperty(this, "app", void 0);

    this.app = express();
    this.connectToTheDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(controllers); // this.initializeErrorHandling();
  }

  _createClass(App, [{
    key: "initializeMiddlewares",
    value: function initializeMiddlewares() {
      this.app.use(bodyParser.json());
    } //   private initializeErrorHandling() {
    //     this.app.use(errorMiddleware);
    //   }

  }, {
    key: "initializeControllers",
    value: function initializeControllers(controllers) {
      var _this = this;

      controllers.forEach(function (controller) {
        _this.app.use('/', controller.router);
      });
    }
  }, {
    key: "connectToTheDatabase",
    value: function connectToTheDatabase() {
      // const {
      //   MONGO_USER,
      //   MONGO_PASSWORD,
      //   MONGO_PATH,
      // } = process.env;
      // mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`);
      var uri = "mongodb+srv://sababa:021967@cluster0-ffkg5.azure.mongodb.net/test?retryWrites=true";
      mongoose.connect(uri);
      console.log("connected to mongooose");
    }
  }]);

  return App;
}();

var _default = App;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NlcnZlci9hcHAudHMiXSwibmFtZXMiOlsiYm9keVBhcnNlciIsInJlcXVpcmUiLCJleHByZXNzIiwibW9uZ29vc2UiLCJBcHAiLCJjb250cm9sbGVycyIsImFwcCIsImNvbm5lY3RUb1RoZURhdGFiYXNlIiwiaW5pdGlhbGl6ZU1pZGRsZXdhcmVzIiwiaW5pdGlhbGl6ZUNvbnRyb2xsZXJzIiwidXNlIiwianNvbiIsImZvckVhY2giLCJjb250cm9sbGVyIiwicm91dGVyIiwidXJpIiwiY29ubmVjdCIsImNvbnNvbGUiLCJsb2ciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsSUFBSUEsVUFBVSxHQUFHQyxPQUFPLENBQUMsYUFBRCxDQUF4Qjs7QUFDQSxJQUFJQyxPQUFPLEdBQUdELE9BQU8sQ0FBQyxTQUFELENBQXJCOztBQUNBLElBQUlFLFFBQVEsR0FBR0YsT0FBTyxDQUFDLFVBQUQsQ0FBdEI7O0lBRU1HLEc7OztBQUVGO0FBR0YsZUFBWUMsV0FBWixFQUF5QjtBQUFBOztBQUFBOztBQUN2QixTQUFLQyxHQUFMLEdBQVdKLE9BQU8sRUFBbEI7QUFFQSxTQUFLSyxvQkFBTDtBQUNBLFNBQUtDLHFCQUFMO0FBQ0EsU0FBS0MscUJBQUwsQ0FBMkJKLFdBQTNCLEVBTHVCLENBTXZCO0FBQ0Q7Ozs7NENBRXVCO0FBQ3RCLFdBQUtDLEdBQUwsQ0FBU0ksR0FBVCxDQUFhVixVQUFVLENBQUNXLElBQVgsRUFBYjtBQUNELEssQ0FFSDtBQUNBO0FBQ0E7Ozs7MENBRXdCTixXLEVBQWE7QUFBQTs7QUFDakNBLE1BQUFBLFdBQVcsQ0FBQ08sT0FBWixDQUFvQixVQUFDQyxVQUFELEVBQWdCO0FBQ2xDLFFBQUEsS0FBSSxDQUFDUCxHQUFMLENBQVNJLEdBQVQsQ0FBYSxHQUFiLEVBQWtCRyxVQUFVLENBQUNDLE1BQTdCO0FBQ0QsT0FGRDtBQUdEOzs7MkNBRXNCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQU1DLEdBQUcsR0FBRyxvRkFBWjtBQUNBWixNQUFBQSxRQUFRLENBQUNhLE9BQVQsQ0FBaUJELEdBQWpCO0FBQ0FFLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHdCQUFaO0FBQ0Q7Ozs7OztlQUdZZCxHIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0ICogYXMgYm9keVBhcnNlciBmcm9tICdib2R5LXBhcnNlcic7XHJcbi8vIGltcG9ydCAqIGFzIGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XHJcbi8vIGltcG9ydCAqIGFzIG1vbmdvb3NlIGZyb20gJ21vbmdvb3NlJztcclxuLy8gaW1wb3J0IENvbnRyb2xsZXIgZnJvbSAnLi4vY2xpZW50L2ludGVyZmFjZXMvSUNvbnRyb2xsZXInO1xyXG5cclxudmFyIGJvZHlQYXJzZXIgPSByZXF1aXJlKFwiYm9keS1wYXJzZXJcIik7XHJcbnZhciBleHByZXNzID0gcmVxdWlyZShcImV4cHJlc3NcIik7XHJcbnZhciBtb25nb29zZSA9IHJlcXVpcmUoXCJtb25nb29zZVwiKTtcclxuXHJcbmNsYXNzIEFwcCB7XHJcblxyXG4gICAgLy8gcHVibGljIGFwcDogZXhwcmVzcy5BcHBsaWNhdGlvbjtcclxuICAgIHB1YmxpYyBhcHA7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGNvbnRyb2xsZXJzKSB7XHJcbiAgICB0aGlzLmFwcCA9IGV4cHJlc3MoKTtcclxuXHJcbiAgICB0aGlzLmNvbm5lY3RUb1RoZURhdGFiYXNlKCk7XHJcbiAgICB0aGlzLmluaXRpYWxpemVNaWRkbGV3YXJlcygpO1xyXG4gICAgdGhpcy5pbml0aWFsaXplQ29udHJvbGxlcnMoY29udHJvbGxlcnMpO1xyXG4gICAgLy8gdGhpcy5pbml0aWFsaXplRXJyb3JIYW5kbGluZygpO1xyXG4gIH1cclxuICBcclxuICBpbml0aWFsaXplTWlkZGxld2FyZXMoKSB7XHJcbiAgICB0aGlzLmFwcC51c2UoYm9keVBhcnNlci5qc29uKCkpO1xyXG4gIH1cclxuXHJcbi8vICAgcHJpdmF0ZSBpbml0aWFsaXplRXJyb3JIYW5kbGluZygpIHtcclxuLy8gICAgIHRoaXMuYXBwLnVzZShlcnJvck1pZGRsZXdhcmUpO1xyXG4vLyAgIH1cclxuXHJcbiAgaW5pdGlhbGl6ZUNvbnRyb2xsZXJzKGNvbnRyb2xsZXJzKSB7XHJcbiAgICBjb250cm9sbGVycy5mb3JFYWNoKChjb250cm9sbGVyKSA9PiB7XHJcbiAgICAgIHRoaXMuYXBwLnVzZSgnLycsIGNvbnRyb2xsZXIucm91dGVyKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgY29ubmVjdFRvVGhlRGF0YWJhc2UoKSB7XHJcbiAgICAvLyBjb25zdCB7XHJcbiAgICAvLyAgIE1PTkdPX1VTRVIsXHJcbiAgICAvLyAgIE1PTkdPX1BBU1NXT1JELFxyXG4gICAgLy8gICBNT05HT19QQVRILFxyXG4gICAgLy8gfSA9IHByb2Nlc3MuZW52O1xyXG4gICAgLy8gbW9uZ29vc2UuY29ubmVjdChgbW9uZ29kYjovLyR7TU9OR09fVVNFUn06JHtNT05HT19QQVNTV09SRH0ke01PTkdPX1BBVEh9YCk7XHJcbiAgICBjb25zdCB1cmkgPSBcIm1vbmdvZGIrc3J2Oi8vc2FiYWJhOjAyMTk2N0BjbHVzdGVyMC1mZmtnNS5henVyZS5tb25nb2RiLm5ldC90ZXN0P3JldHJ5V3JpdGVzPXRydWVcIjtcclxuICAgIG1vbmdvb3NlLmNvbm5lY3QodXJpKTtcclxuICAgIGNvbnNvbGUubG9nKFwiY29ubmVjdGVkIHRvIG1vbmdvb29zZVwiKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFwcDsiXX0=