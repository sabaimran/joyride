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

    /**
     * Initialize all the routes.
     */
    public initRoutes() {
        this.router.get(this.path, this.getAllRides);
        this.router.get(`${this.path}/bydriver`, this.getAllRidesByDriverID);
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

        // If direction is specificed, show only one direction.
        const dir = request.query.dir.valueOf();
        
        // If date is specificed, show only dates greater than or equal to that one.
        const date = new Date(request.query.date.valueOf().toString());

        // When ready, specify also $lte in the date filter. 
        // (https://stackoverflow.com/questions/39940595/gte-and-lte-in-mongoose-with-multiple-condition)
        // Sort rides in order.
        if (dir) {
            this.ride.find({
                category: dir,
                date: {
                    $gte: date
                }
            }).sort(
                {date: '1'}
            ).then((rides) => {
                response.send(rides)
            });
        } else {
            this.ride.find().then((rides) => {
                response.send(rides);
            });
        }
    }

    /**
     * Get all the entries following the Ride schema.
     */
    private getAllRidesByDriverID = (request: express.Request, response: express.Response) => {
        // Get the driverID        
        const driverID = request.query.driverID.valueOf();
        const date = new Date();

        // Sort rides in order.
        try {
            if (driverID) {
                this.ride.find({
                    driverID: driverID,
                    date: {
                        $gte: date
                    }
                }).sort(
                    {date: '1'}
                ).then((rides) => {
                    response.send(rides)
                });
            } else {
                response.send();
            }
        } catch {
            response.send();
        }
    }

    /**
     * Get a ride by the specific ID.
     */
    private getRideById = (request: express.Request, response: express.Response) => {
        const id = request.params.id;
        console.log(id);
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
