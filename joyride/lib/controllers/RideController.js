"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var express = _interopRequireWildcard(require("express"));

var _Ride = _interopRequireDefault(require("../schemas/Ride"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var RideController =
/*#__PURE__*/
function () {
  function RideController() {
    var _this = this;

    _classCallCheck(this, RideController);

    _defineProperty(this, "path", '/ride');

    _defineProperty(this, "router", express.Router());

    _defineProperty(this, "ride", _Ride["default"]);

    _defineProperty(this, "getAllRides", function (request, response) {
      _this.ride.find().then(function (rides) {
        response.send(rides);
      });
    });

    _defineProperty(this, "getRideById", function (request, response) {
      var id = request.params.id;

      _this.ride.findById(id).then(function (ride) {
        response.send(ride);
      });
    });

    _defineProperty(this, "modifyRide", function (request, response) {
      var id = request.params.id;
      var rideData = request.body;

      _this.ride.findByIdAndUpdate(id, rideData, {
        "new": true
      }).then(function (ride) {
        response.send(ride);
      });
    });

    _defineProperty(this, "createRide", function (request, response) {
      // Should be a IRide interface
      var rideData = request.body;
      var createdRide = new _this.ride(rideData);
      createdRide.save().then(function (savedPost) {
        response.send(savedPost);
      });
    });

    _defineProperty(this, "deleteRide", function (request, response) {
      var id = request.params.id;

      _this.ride.findByIdAndDelete(id).then(function (successResponse) {
        if (successResponse) {
          response.send(200);
        } else {
          response.send(404);
        }
      });
    });

    this.initRoutes();
  }

  _createClass(RideController, [{
    key: "initRoutes",
    value: function initRoutes() {
      this.router.get(this.path, this.getAllRides);
      this.router.get("".concat(this.path, "/:id"), this.getRideById);
      this.router.put("".concat(this.path, "/:id"), this.modifyRide);
      this.router["delete"]("".concat(this.path, "/:id"), this.deleteRide);
      this.router.post(this.path, this.createRide);
    }
  }]);

  return RideController;
}();

var _default = RideController;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NsaWVudC9jb250cm9sbGVycy9SaWRlQ29udHJvbGxlci50cyJdLCJuYW1lcyI6WyJSaWRlQ29udHJvbGxlciIsImV4cHJlc3MiLCJSb3V0ZXIiLCJyaWRlTW9kZWwiLCJyZXF1ZXN0IiwicmVzcG9uc2UiLCJyaWRlIiwiZmluZCIsInRoZW4iLCJyaWRlcyIsInNlbmQiLCJpZCIsInBhcmFtcyIsImZpbmRCeUlkIiwicmlkZURhdGEiLCJib2R5IiwiZmluZEJ5SWRBbmRVcGRhdGUiLCJjcmVhdGVkUmlkZSIsInNhdmUiLCJzYXZlZFBvc3QiLCJmaW5kQnlJZEFuZERlbGV0ZSIsInN1Y2Nlc3NSZXNwb25zZSIsImluaXRSb3V0ZXMiLCJyb3V0ZXIiLCJnZXQiLCJwYXRoIiwiZ2V0QWxsUmlkZXMiLCJnZXRSaWRlQnlJZCIsInB1dCIsIm1vZGlmeVJpZGUiLCJkZWxldGVSaWRlIiwicG9zdCIsImNyZWF0ZVJpZGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFHQTs7Ozs7Ozs7Ozs7Ozs7SUFFTUEsYzs7O0FBTUYsNEJBQWM7QUFBQTs7QUFBQTs7QUFBQSxrQ0FMQSxPQUtBOztBQUFBLG9DQUpFQyxPQUFPLENBQUNDLE1BQVIsRUFJRjs7QUFBQSxrQ0FGQ0MsZ0JBRUQ7O0FBQUEseUNBWVEsVUFBQ0MsT0FBRCxFQUEyQkMsUUFBM0IsRUFBMEQ7QUFDNUUsTUFBQSxLQUFJLENBQUNDLElBQUwsQ0FBVUMsSUFBVixHQUFpQkMsSUFBakIsQ0FBc0IsVUFBQ0MsS0FBRCxFQUFXO0FBQzdCSixRQUFBQSxRQUFRLENBQUNLLElBQVQsQ0FBY0QsS0FBZDtBQUNILE9BRkQ7QUFHSCxLQWhCYTs7QUFBQSx5Q0FrQlEsVUFBQ0wsT0FBRCxFQUEyQkMsUUFBM0IsRUFBMEQ7QUFDNUUsVUFBTU0sRUFBRSxHQUFHUCxPQUFPLENBQUNRLE1BQVIsQ0FBZUQsRUFBMUI7O0FBQ0EsTUFBQSxLQUFJLENBQUNMLElBQUwsQ0FBVU8sUUFBVixDQUFtQkYsRUFBbkIsRUFBdUJILElBQXZCLENBQTRCLFVBQUNGLElBQUQsRUFBVTtBQUNsQ0QsUUFBQUEsUUFBUSxDQUFDSyxJQUFULENBQWNKLElBQWQ7QUFDSCxPQUZEO0FBR0gsS0F2QmE7O0FBQUEsd0NBeUJPLFVBQUNGLE9BQUQsRUFBMkJDLFFBQTNCLEVBQTBEO0FBQzNFLFVBQU1NLEVBQUUsR0FBR1AsT0FBTyxDQUFDUSxNQUFSLENBQWVELEVBQTFCO0FBQ0EsVUFBTUcsUUFBUSxHQUFHVixPQUFPLENBQUNXLElBQXpCOztBQUNBLE1BQUEsS0FBSSxDQUFDVCxJQUFMLENBQVVVLGlCQUFWLENBQTRCTCxFQUE1QixFQUFnQ0csUUFBaEMsRUFBMEM7QUFBQyxlQUFNO0FBQVAsT0FBMUMsRUFBd0ROLElBQXhELENBQTZELFVBQUNGLElBQUQsRUFBVTtBQUNuRUQsUUFBQUEsUUFBUSxDQUFDSyxJQUFULENBQWNKLElBQWQ7QUFDSCxPQUZEO0FBR0gsS0EvQmE7O0FBQUEsd0NBaUNPLFVBQUNGLE9BQUQsRUFBMkJDLFFBQTNCLEVBQTBEO0FBQzNFO0FBQ0EsVUFBTVMsUUFBUSxHQUFHVixPQUFPLENBQUNXLElBQXpCO0FBQ0EsVUFBTUUsV0FBVyxHQUFHLElBQUksS0FBSSxDQUFDWCxJQUFULENBQWNRLFFBQWQsQ0FBcEI7QUFDQUcsTUFBQUEsV0FBVyxDQUFDQyxJQUFaLEdBQW1CVixJQUFuQixDQUF3QixVQUFDVyxTQUFELEVBQWU7QUFDbkNkLFFBQUFBLFFBQVEsQ0FBQ0ssSUFBVCxDQUFjUyxTQUFkO0FBQ0gsT0FGRDtBQUdILEtBeENhOztBQUFBLHdDQTBDTyxVQUFDZixPQUFELEVBQTJCQyxRQUEzQixFQUEwRDtBQUMzRSxVQUFNTSxFQUFFLEdBQUdQLE9BQU8sQ0FBQ1EsTUFBUixDQUFlRCxFQUExQjs7QUFDQSxNQUFBLEtBQUksQ0FBQ0wsSUFBTCxDQUFVYyxpQkFBVixDQUE0QlQsRUFBNUIsRUFBZ0NILElBQWhDLENBQXFDLFVBQUNhLGVBQUQsRUFBcUI7QUFDdEQsWUFBSUEsZUFBSixFQUFxQjtBQUNqQmhCLFVBQUFBLFFBQVEsQ0FBQ0ssSUFBVCxDQUFjLEdBQWQ7QUFDSCxTQUZELE1BRU87QUFDSEwsVUFBQUEsUUFBUSxDQUFDSyxJQUFULENBQWMsR0FBZDtBQUNIO0FBQ0osT0FORDtBQU9ILEtBbkRhOztBQUNWLFNBQUtZLFVBQUw7QUFDSDs7OztpQ0FFb0I7QUFDakIsV0FBS0MsTUFBTCxDQUFZQyxHQUFaLENBQWdCLEtBQUtDLElBQXJCLEVBQTJCLEtBQUtDLFdBQWhDO0FBQ0EsV0FBS0gsTUFBTCxDQUFZQyxHQUFaLFdBQW1CLEtBQUtDLElBQXhCLFdBQW9DLEtBQUtFLFdBQXpDO0FBQ0EsV0FBS0osTUFBTCxDQUFZSyxHQUFaLFdBQW1CLEtBQUtILElBQXhCLFdBQW9DLEtBQUtJLFVBQXpDO0FBQ0EsV0FBS04sTUFBTCxxQkFBc0IsS0FBS0UsSUFBM0IsV0FBdUMsS0FBS0ssVUFBNUM7QUFDQSxXQUFLUCxNQUFMLENBQVlRLElBQVosQ0FBaUIsS0FBS04sSUFBdEIsRUFBNEIsS0FBS08sVUFBakM7QUFDSDs7Ozs7O2VBNENVaEMsYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XHJcbmltcG9ydCBDb250cm9sbGVyIGZyb20gJy4uL2ludGVyZmFjZXMvSUNvbnRyb2xsZXInO1xyXG5pbXBvcnQgeyBJUmlkZSB9IGZyb20gJy4uL2ludGVyZmFjZXMvSVJpZGUnO1xyXG5pbXBvcnQgcmlkZU1vZGVsIGZyb20gJy4uL3NjaGVtYXMvUmlkZSc7XHJcblxyXG5jbGFzcyBSaWRlQ29udHJvbGxlciBpbXBsZW1lbnRzIENvbnRyb2xsZXIge1xyXG4gICAgcHVibGljIHBhdGggPSAnL3JpZGUnO1xyXG4gICAgcHVibGljIHJvdXRlciA9IGV4cHJlc3MuUm91dGVyKCk7XHJcblxyXG4gICAgcHJpdmF0ZSByaWRlID0gcmlkZU1vZGVsO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuaW5pdFJvdXRlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdFJvdXRlcygpIHtcclxuICAgICAgICB0aGlzLnJvdXRlci5nZXQodGhpcy5wYXRoLCB0aGlzLmdldEFsbFJpZGVzKTtcclxuICAgICAgICB0aGlzLnJvdXRlci5nZXQoYCR7dGhpcy5wYXRofS86aWRgLCB0aGlzLmdldFJpZGVCeUlkKTtcclxuICAgICAgICB0aGlzLnJvdXRlci5wdXQoYCR7dGhpcy5wYXRofS86aWRgLCB0aGlzLm1vZGlmeVJpZGUpO1xyXG4gICAgICAgIHRoaXMucm91dGVyLmRlbGV0ZShgJHt0aGlzLnBhdGh9LzppZGAsIHRoaXMuZGVsZXRlUmlkZSk7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIucG9zdCh0aGlzLnBhdGgsIHRoaXMuY3JlYXRlUmlkZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRBbGxSaWRlcyA9IChyZXF1ZXN0OiBleHByZXNzLlJlcXVlc3QsIHJlc3BvbnNlOiBleHByZXNzLlJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgdGhpcy5yaWRlLmZpbmQoKS50aGVuKChyaWRlcykgPT4ge1xyXG4gICAgICAgICAgICByZXNwb25zZS5zZW5kKHJpZGVzKVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0UmlkZUJ5SWQgPSAocmVxdWVzdDogZXhwcmVzcy5SZXF1ZXN0LCByZXNwb25zZTogZXhwcmVzcy5SZXNwb25zZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGlkID0gcmVxdWVzdC5wYXJhbXMuaWQ7XHJcbiAgICAgICAgdGhpcy5yaWRlLmZpbmRCeUlkKGlkKS50aGVuKChyaWRlKSA9PiB7XHJcbiAgICAgICAgICAgIHJlc3BvbnNlLnNlbmQocmlkZSlcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG1vZGlmeVJpZGUgPSAocmVxdWVzdDogZXhwcmVzcy5SZXF1ZXN0LCByZXNwb25zZTogZXhwcmVzcy5SZXNwb25zZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGlkID0gcmVxdWVzdC5wYXJhbXMuaWQ7XHJcbiAgICAgICAgY29uc3QgcmlkZURhdGEgPSByZXF1ZXN0LmJvZHk7XHJcbiAgICAgICAgdGhpcy5yaWRlLmZpbmRCeUlkQW5kVXBkYXRlKGlkLCByaWRlRGF0YSwge25ldyA6IHRydWV9KS50aGVuKChyaWRlKSA9PiB7XHJcbiAgICAgICAgICAgIHJlc3BvbnNlLnNlbmQocmlkZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjcmVhdGVSaWRlID0gKHJlcXVlc3Q6IGV4cHJlc3MuUmVxdWVzdCwgcmVzcG9uc2U6IGV4cHJlc3MuUmVzcG9uc2UpID0+IHtcclxuICAgICAgICAvLyBTaG91bGQgYmUgYSBJUmlkZSBpbnRlcmZhY2VcclxuICAgICAgICBjb25zdCByaWRlRGF0YSA9IHJlcXVlc3QuYm9keTtcclxuICAgICAgICBjb25zdCBjcmVhdGVkUmlkZSA9IG5ldyB0aGlzLnJpZGUocmlkZURhdGEpO1xyXG4gICAgICAgIGNyZWF0ZWRSaWRlLnNhdmUoKS50aGVuKChzYXZlZFBvc3QpID0+IHtcclxuICAgICAgICAgICAgcmVzcG9uc2Uuc2VuZChzYXZlZFBvc3QpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZGVsZXRlUmlkZSA9IChyZXF1ZXN0OiBleHByZXNzLlJlcXVlc3QsIHJlc3BvbnNlOiBleHByZXNzLlJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgY29uc3QgaWQgPSByZXF1ZXN0LnBhcmFtcy5pZDtcclxuICAgICAgICB0aGlzLnJpZGUuZmluZEJ5SWRBbmREZWxldGUoaWQpLnRoZW4oKHN1Y2Nlc3NSZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoc3VjY2Vzc1Jlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICByZXNwb25zZS5zZW5kKDIwMCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXNwb25zZS5zZW5kKDQwNCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSaWRlQ29udHJvbGxlcjsiXX0=