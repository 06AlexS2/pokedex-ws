import { Response, NextFunction } from "express";
import customError from "../../utils/error/CustomError";

const errorController = (
  err: customError,
  req: any,
  res: Response,
  next: NextFunction
) => {
  return res.status(err.code).json({ code: err.code, error: err.message });
};

const dbError = (err: customError) => {
  return Promise.reject(new Error(customError.name));
};
module.exports(errorController, dbError);
