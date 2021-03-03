import {Request as IRequest, Response as IResponse, NextFunction as INextFunction} from 'express';
import {Subscription} from '../database/models/Subscription';
import {Queue} from '../services/Queue';

class Mailing {
  private queue: Queue;
  constructor() {
    this.queue = new Queue();
  }

  public async dispatch(req: IRequest, res: IResponse, next: INextFunction) {
    try {
      const {title, message} = req.body as {title: string, message: string};
      const emails = await Subscription
        .findAll({
          where: {flag: true},
          attributes: ['email'],
          raw: true
        });

      await this.queue.add(emails.map(({email}) => email), {title, message});
      res.json({success: true});
    } catch (error) {
      next(error);
    }
  }
}

const controller = new Mailing();
export default controller;
