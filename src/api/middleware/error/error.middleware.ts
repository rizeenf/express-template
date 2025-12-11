import { NextFunction, Request, Response } from "express";
import { HttpError } from "../../../utils/exceptions/HttpError";

export function errorHandler(
  err: unknown,        // must be unknown / any for Express to catch all errors
  req: Request,
  res: Response,
  next: NextFunction
) {
  // If the error is an HttpError (your custom type)
  if (err instanceof HttpError) {
    return res.status(err.status).json({
      success: false,
      data: null,
      error: {
        code: err.status,
        message: err.message,
      },
    });
  }

  // Unknown / unexpected error
  console.error("Unhandled error:", err);

  return res.status(500).json({
    success: false,
    data: null,
    error: {
      code: 500,
      message: "Internal Server Error",
    },
  });
}
