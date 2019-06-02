import * as express from 'express';
import * as jwt from 'jsonwebtoken';

import Controller from '../interfaces/IController';
import userModel from '../schemas/User';

/**
 * Controller class for the user.
 * @TODO write functions for updating, deleting, and getting user.
 */
export default class UserController implements Controller {
    public path = '/user';
    public router = express.Router();

    private user = userModel;

    constructor() {
        this.initRoutes();
    }

    /**
     * Initialize all routes
     */
    public initRoutes() {
        this.router.get(`${this.path}/allusers`, this.getAllusers);
        this.router.get(`${this.path}/:id`, this.getUserById);
        this.router.post(`${this.path}/login`, this.login);
        this.router.post(`${this.path}/checktoken`, this.checkToken);
        this.router.post(`${this.path}/signup`, this.createNewUser);
        this.router.delete(`${this.path}`, this.deleteUser);
        this.router.put(`${this.path}`, this.modifyUser);
    }

    /**
     * New user sign up.
     * @TODO save encrypted passwords.
     */
    private createNewUser = (request: express.Request, response: express.Response) => {
        console.log("create new user");
        const userData = request.body;

        const createdUser = new this.user(userData);
        createdUser.save().then((savedUser) => {
            response.send(savedUser);
        })
    }

    /**
     * Get a specific user's information.
     * @TODO make this so that it's only accessible by a user with the correct JWT Token.
     */
    private getUserById = (request: express.Request, response: express.Response) => {
        console.log('get user by id');
        const id = request.params.id;
        this.user.findById(id).then((founduser) => {
            if (founduser) {
                response.send(founduser);
            } else {
                response.sendStatus(404);
            }
        });
    }
    /**
     * Delete a user.
     */
    private deleteUser = (request: express.Request, response: express.Response) => {
        const id = request.params.id;
        this.user.findByIdAndDelete(id).then((successResponse) => {
            if (successResponse) {
                response.sendStatus(200);
            } else {
                response.sendStatus(404);
            }
        })
    }

    /**
     * Modify user data.
     */
    private modifyUser = (request: express.Request, response: express.Response) => {
        const id = request.params.id;
        const userData = request.body;
        this.user.findByIdAndUpdate(id, userData, {new : true}).then((ride) => {
            response.send(ride);
        });
    }

    /**
     * Get all users.
     */
    private getAllusers = (request: express.Request, response: express.Response) => {
        console.log('get all users');
        this.user.find().then((users) => {
            response.send(users);
        });
    }

    /**
     * Login user from email and password.
     * @TODO use encryption to process the passwords.
     */
    private login = (request: express.Request, response: express.Response) => {
        console.log('called login');
        const loginData = request.body;
        const email = loginData.email;
        const password = loginData.password;

        this.user.findOne({ email: email }).then((founduser) => {
            if (founduser) {
                // Create a token and attach it to the header.
                const tokenData = this.createToken(founduser.id);
                console.log('set cookie');
                response.setHeader('Set-Cookie', [this.createCookie(tokenData)]);
    
                return response.json({
                    success: true,
                    tokenData
                });
            } else {
                console.log('user not found');
                response.sendStatus(404);
            }
        });
    }

    /**
     * Create a new signed JSON Web Token.
     * @param id ID from a user object.
     */
    private createToken(id) {
        // SIGNING OPTIONS
        const signOptions = {
            expiresIn:  "168h"
        };

        const token = jwt.sign({ id }, process.env.PRIVATE_KEY, signOptions);

        return token;
    }

    /**
     * Check if a JWT is active and valid.
     */
    private checkToken = (request: express.Request, response: express.Response) => {
        console.log('check token method');
        // Get token from cookies.
        const cookies = request.cookies;
        if (cookies && cookies.Authorization) { 
            const token = cookies.Authorization;
            console.log(token);
            jwt.verify(token, process.env.PRIVATE_KEY, (err, decoded) => {

                const decodedpayload = jwt.decode(token);
                console.log(decodedpayload);
                console.log('verified');
                console.log(decoded);
                console.log(decoded.id);
                if (err) {
                    return response.json({
                        success: false,
                        message: 'Invalid token'
                    });
                } else {
                    this.user.findById(decoded.id).then((founduser) => {
                        if (founduser) {
                            return response.json({
                                success: true,
                                founduser
                            });
                        } else {
                            response.json({
                                success: false,
                                message: 'User not found'
                            }).sendStatus(404);
                        }
                    });
                }
            });
        }
    }

    /**
     * Create cookie from token to be stored in the user's site.
     * @param token token returned from JWT sign
     */
    private createCookie(token) {
        return `Authorization=${token}; HttpOnly; Max-Età=${token.expiresIn}`;
      }
}