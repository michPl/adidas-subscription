import {Request as IRequest, Response as IResponse} from 'express';
import {IError} from '../interfaces';

/**
 * Mock errors for the clients
 */
function clientError(error: IError, req: IRequest, res: IResponse): void {
  (process.env.NODE_ENV === 'product') ?
    res.status(error.status || 500).send({error: 'Something failed!', meta: error.meta}) :
    res.status(error.status || 500).send({error: error.message, stack: error.stack, meta: error.meta});
}

export {clientError};
