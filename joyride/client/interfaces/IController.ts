import { Router } from 'express';

/**
 * Basic interface for a controller.
 */
interface Controller {
  path: string;
  router: Router;
}
 
export default Controller;