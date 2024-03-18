import CustomError from "../../utils/error/CustomError";

export default class DomainError extends CustomError {
  constructor(message: string, code: number, status: string) {
    super(message, 422, status);
  }
}