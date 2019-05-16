import * as express from 'express';
import Controller from '../interfaces/IController';
import { IRide } from '../interfaces/IRide';
import rideModel from '../schemas/Ride';

class RideController implements Controller {
    public path = '/ride';
    public router = express.Router();

    private ride = rideModel;

    constructor() {
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get(this.path, this.getAllRides);
        this.router.get(`${this.path}/:id`, this.getRideById);
        this.router.put(`${this.path}/:id`, this.modifyRide);
        this.router.delete(`${this.path}/:id`, this.deleteRide);
        this.router.post(this.path, this.createRide);
    }

    private getAllRides = (request: express.Request, response: express.Response) => {
        this.ride.find().then((rides) => {
            response.send(rides)
        });
    }

    private getRideById = (request: express.Request, response: express.Response) => {
        const id = request.params.id;
        this.ride.findById(id).then((ride) => {
            response.send(ride)
        });
    }

    private modifyRide = (request: express.Request, response: express.Response) => {
        const id = request.params.id;
        const rideData = request.body;
        this.ride.findByIdAndUpdate(id, rideData, {new : true}).then((ride) => {
            response.send(ride);
        });
    }

    private createRide = (request: express.Request, response: express.Response) => {
        // Should be a IRide interface
        const rideData = request.body;
        const createdRide = new this.ride(rideData);
        createdRide.save().then((savedPost) => {
            response.send(savedPost);
        });
    }

    private deleteRide = (request: express.Request, response: express.Response) => {
        const id = request.params.id;
        this.ride.findByIdAndDelete(id).then((successResponse) => {
            if (successResponse) {
                response.send(200);
            } else {
                response.send(404);
            }
        })
    }
}

export default RideController;