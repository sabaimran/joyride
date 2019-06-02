import { Document, Model, Schema, model, Mongoose } from "mongoose";
import "mongoose";
import { IRide } from '../interfaces/IRide';

/**
 * @TODO add: price, # of seats, and change `name` to "user id"
 */

/**
 * Schema for Ride objects in MongoDB.
 */
const rideSchema = new Schema({
    firstname: String,
    lastname: String,
    date: Date,
    destination: String,
    departure: String,
    category: String
}, {
    collection: 'Rides'
});

const rideModel = model<IRide & Document>('Ride', rideSchema);
export default rideModel;