import { Document, Model, Schema, model } from "mongoose";
import { IUser } from '../interfaces/IUser';

// @TODO determine which fields I want to keep in generic user.

/**
 * Schema for basic user object in MongoDB.
 * email must be @illinois.edu
 */
const userSchema = new Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    license: String,
    aboutme: String
});

const userModel = model<IUser & Document>('User', userSchema);
export default userModel;