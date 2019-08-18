import { Document, Model, Schema, model, Mongoose } from "mongoose";
import "mongoose";
import { IRide } from '../interfaces/IRide';

/**
<<<<<<< HEAD
 * @TODO add: price, # of seats
=======
 * @TODO add: price, # of seats, and change `name` to "user id"
>>>>>>> 29e5f2039d72bd5e9927d56934fa020e1b9eeb42
 */

/**
 * Schema for Ride objects in MongoDB.
 */
const rideSchema = new Schema({
    driverID: String,
    date: Date,
    destination: String,
    departure: String,
    category: String
}, {
    collection: 'Rides'
});

const rideModel = model<IRide & Document>('Ride', rideSchema);
export default rideModel;