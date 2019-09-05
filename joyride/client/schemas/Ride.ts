import { Document, Model, Schema, model, Mongoose } from "mongoose";
import "mongoose";
import { IRide } from '../interfaces/IRide';

/**
 * @TODO add: price, # of seats
 */

/**
 * Schema for Ride objects in MongoDB.
 */
const rideSchema = new Schema({
    driverID: String,
    date: Date,
    destination: String,
    departure: String,
    category: String,
    price: Number,
    numberOfSeats: Number
}, {
    collection: 'Rides'
});

const rideModel = model<IRide & Document>('Ride', rideSchema);
export default rideModel;