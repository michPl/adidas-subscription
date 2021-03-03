import {Request as IRequest, Response as IResponse, NextFunction as INextFunction} from 'express';
import {ISubscription} from '../interfaces';
import {Subscription} from '../database/models/Subscription';
import {JsonError} from '../utils/JsonError';
import errors from '../errors/subscription';

class SubscriptionController {
  public async store(req: IRequest, res: IResponse, next: INextFunction) {
    try {
      const {email, birth, flag, first_name: firstName, gender} = req.body as ISubscription;

      if (await Subscription.findOne({where: {email}})) throw new JsonError(errors.alreadyExists);

      const subscriptions = new Subscription({email, birth, flag, firstName, gender});
      await subscriptions.save();

      res.json({success: true, id: subscriptions.id});
    } catch (error) {
      next(error);
    }
  }

  public async index(req: IRequest, res: IResponse, next: INextFunction): Promise<void> {
    try {
      const page = Number(req.query.page || 0);
      const pageSize = Number(req.query.page_size || process.env.DEFAULT_PAGE_SIZE);

      const subscriptions = await Subscription
        .scope([{method: ['page', page, pageSize]}])
        .findAll({
          order: [['id', 'DESC']]
        });

      res.json({subscriptions});
    } catch (error) {
      next(error);
    }
  }

  public async details(req: IRequest, res: IResponse, next: INextFunction): Promise<void> {
    try {
      const subscription = await Subscription.findByPk(Number(req.params.id));

      if (!subscription) throw new JsonError(errors.notFound);

      res.json({subscription});
    } catch (error) {
      next(error);
    }
  }

  public async remove(req: IRequest, res: IResponse, next: INextFunction): Promise<void> {
    try {
      const subscription = await Subscription.findByPk(Number(req.params.id));

      if (!subscription) throw new JsonError(errors.notFound);

      await subscription.destroy();

      res.json({success: true});
    } catch (error) {
      next(error);
    }
  }

  public async findByEmail(req: IRequest, res: IResponse, next: INextFunction): Promise<void> {
    try {
      const subscription = await Subscription.findOne({where: {email: req.query.email}});

      res.json({subscription});
    } catch (error) {
      next(error);
    }
  }
}

const controller = new SubscriptionController();
export default controller;
