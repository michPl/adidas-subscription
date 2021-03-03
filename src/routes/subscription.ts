import {Router as IRouter} from 'express';
import {body, query, param} from 'express-validator';
import {validate} from '../middlewares';
import controller from '../controllers/Subscription';

export default (Router: () => IRouter): IRouter => {
  const router: IRouter = Router();

  /**
   * Add subscription
   */
  router.post('/',
    [
      body('email').isEmail(),
      body('birth').isDate({format: 'YYYY-MM-DD', strictMode: true}).toDate(),
      body('flag').isBoolean(),
      body('first_name').optional({checkFalsy: true}).isLength({max: 50}).trim(),
      body('gender').optional({checkFalsy: true}).isIn(['male', 'female']),
    ],
    validate,
    controller.store
  );

  /**
   * Get subscriptions list
   */
  router.get('/',
    [
      query('page').optional({checkFalsy: true}).isInt(),
      query('page_size').optional({checkFalsy: true}).isInt(),
    ],
    validate,
    controller.index
  );

  /**
   * Find subscription by email
   */
  router.get('/find',
    [query('email').isEmail()],
    validate,
    controller.findByEmail
  );

  /**
   * Get subscription by id
   */
  router.get('/:id',
    [param('id').isInt({min: 1})],
    validate,
    controller.details
  );

  /**
   * Delete subscription
   */
  router.delete('/:id',
    [param('id').isInt({min: 1})],
    validate,
    controller.remove
  );

  return router;
};

