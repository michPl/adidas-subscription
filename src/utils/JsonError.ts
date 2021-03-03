import {IError} from '../interfaces';

interface IJsonError {
  message: string;
  status?: number;
  meta?: {[key: string]: unknown};
}

class JsonError extends Error implements IError {
  public readonly status?: number;
  public readonly meta?: {[key: string]: unknown};

  constructor({message, status, meta}: IJsonError) {
    super(message);
    if (status) this.status = status;
    if (meta) this.meta = meta;
  }
}

export {JsonError};
