import {Router as IRouter} from 'express';
import {body} from 'express-validator';
import {validate} from '../middlewares';
import controller from '../controllers/Mailing';

export default (Router: () => IRouter): IRouter => {
  const router: IRouter = Router();

  /**
   * Send dispatch
   */
  router.post('/',
    [
      body('title').isLength({max: 200}).trim(),
      body('message').isLength({min: 1}).trim(),
    ],
    validate,
    controller.dispatch.bind(controller)
  );

  return router;
};
