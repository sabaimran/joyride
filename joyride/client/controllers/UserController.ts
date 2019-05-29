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

    /**
     * Initialize all routes
     */
    public initRoutes() {
        this.router.post(`${this.path}/signup`, this.createNewUser);
    }

    /**
     * New user sign up.
     */
    private createNewUser = (request: express.Request, response: express.Response) => {
        const userData = request.body;

        const createdUser = new this.user(userData);
        createdUser.save().then((savedUser) => {
            response.send(savedUser);
        })
    }
}