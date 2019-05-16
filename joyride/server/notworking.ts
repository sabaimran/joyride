//server/server.js
import App from './app';
import RideController from '../client/controllers/RideController';

const app = new App (
  [
    new RideController()
  ],
);

export default app;
