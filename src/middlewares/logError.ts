import {Request as IRequest, Response as IResponse, NextFunction as INextFunction} from 'express';
import {Logger} from '../utils/Logger';
import {IError} from '../interfaces';

/**
 * Mock logging errors
 */
function logError(error: IError, req: IRequest, res: IResponse, next: INextFunction): void {
  if (error.status < 500) {
    next(error);
  } else {
    Logger.error(
      error.message,
      {
        url: req.path,
        status: error.status,
        stack: error.stack
      }
    );
    next(error);
  }
}

export {logError};
