import { Document, Model, Schema, model } from "mongoose";
import { IUser } from '../interfaces/IUser';

// @TODO determine which fields I want to keep in generic user.

/**
 * Schema for basic user object in MongoDB.
 */
const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    license: String
});

const userModel = model<IUser & Document>('User', userSchema);
export default userModel;