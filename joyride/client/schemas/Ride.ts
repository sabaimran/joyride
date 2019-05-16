import { Document, Model, Schema, model } from "mongoose";
import { IRide } from '../interfaces/IRide';

// @TODO determine which fields I want to keep in generic user.

const rideSchema = new Schema({
    firstName: String,
    lastName: String,
    date: Date,
    destination: String,
    departure: String,
    category: String
});

const rideModel = model<IRide & Document>('Ride', rideSchema);
export default rideModel;