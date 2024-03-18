import CustomError from "./CustomError";

export default class InfrastructureError extends CustomError {
  constructor(message: string, code: number, status: string) {
    super(message, code, status);
  }
}