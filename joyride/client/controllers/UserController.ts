import * as express from 'express';
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
        this.router.post(`${this.path}/signup`, this.createNewUser);
        this.router.delete(`${this.path}`, this.deleteUser);
        this.router.put(`${this.path}`, this.modifyUser);
    }

    /**
     * New user sign up.
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
}