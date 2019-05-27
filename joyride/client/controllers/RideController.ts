import * as express from 'express';
import Controller from '../interfaces/IController';
import rideModel from '../schemas/Ride';

export default class RideController implements Controller {
    public path = '/ride';
    public router = express.Router();

    private ride = rideModel;

    constructor() {
        this.initRoutes();
    }

    public initRoutes() {
        console.log("rides are being intialized");
        this.router.get(this.path, this.getAllRides);
        this.router.get(`${this.path}/:id`, this.getRideById);
        this.router.put(`${this.path}/:id`, this.modifyRide);
        this.router.delete(`${this.path}/:id`, this.deleteRide);
        this.router.post(this.path, this.createRide);
    }

    /**
     * Get all the entries following the Ride schema.
     */
    private getAllRides = (request: express.Request, response: express.Response) => {
        console.log("get list of rides");

        const dir = request.query.dir;
        // If direction is specificed, show only one direction.
        if (dir) {
            this.ride.find({category: dir}).then((rides) => {
                response.send(rides)
            });
        } else {
            this.ride.find().then((rides) => {
                response.send(rides);
            });
        }
    }

    /**
     * Get a ride by the specific ID.
     */
    private getRideById = (request: express.Request, response: express.Response) => {
        const id = request.params.id;
        this.ride.findById(id).then((ride) => {
            response.send(ride)
        });
    }

    /**
     * Update information regarding a ride.
     */
    private modifyRide = (request: express.Request, response: express.Response) => {
        const id = request.params.id;
        const rideData = request.body;
        this.ride.findByIdAndUpdate(id, rideData, {new : true}).then((ride) => {
            response.send(ride);
        });
    }

    /**
     * Add a new ride to the database.
     */
    private createRide = (request: express.Request, response: express.Response) => {
        // Should be a IRide interface
        const rideData = request.body;
        console.log('received data:');
        console.log(request.body);
        console.log('createride:\n '+request.body.firstname)
        const createdRide = new this.ride(rideData);
        createdRide.save().then((savedPost) => {
            response.send(savedPost);
        });
    }

    /**
     * Delete a ride by its ID number.
     */
    private deleteRide = (request: express.Request, response: express.Response) => {
        const id = request.params.id;
        this.ride.findByIdAndDelete(id).then((successResponse) => {
            if (successResponse) {
                response.sendStatus(200);
            } else {
                response.sendStatus(404);
            }
        })
    }
}
