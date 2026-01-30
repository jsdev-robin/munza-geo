import { HttpStatusCode } from '@server/utils';
import { NextFunction, Request, Response } from 'express';
import { matchedData, Result, validationResult } from 'express-validator';
import { ApiError } from './errors/ApiError';

interface ValidationError {
  msg: string;
}

export const validationRequest = (
  req: Request,
  _: Response,
  next: NextFunction,
): void => {
  const errors: Result<ValidationError> = validationResult(req);
  if (!errors.isEmpty()) {
    const error: ApiError = new ApiError(
      errors.array()[0].msg,
      HttpStatusCode.UNPROCESSABLE_ENTITY,
    );
    next(error);
    return;
  }

  req.body = matchedData(req, { locations: ['body'] });

  next();
};
