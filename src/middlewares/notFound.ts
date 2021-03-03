import {Request as IRequest, Response as IResponse} from 'express';

/**
 * Mock not found middleware
 */
function notFound(req: IRequest, res: IResponse): void {
  res.status(404).send({error: 'Not Found'});
}

export {notFound};
