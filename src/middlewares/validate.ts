import {Request, Response, NextFunction} from 'express';
import {validationResult} from 'express-validator';

function validate(req: Request, res: Response, next: NextFunction): void {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).json({errors: errors.array()});
    return;
  }
  next();
}

export {validate};
