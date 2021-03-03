export interface IError extends Error {
  status?: number;
  meta?: {[key: string]: unknown};
}
