export default class CustomError extends Error {
  constructor(public message: string, public code: number, public status: string) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}