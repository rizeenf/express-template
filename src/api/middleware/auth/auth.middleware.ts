import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { HttpError } from "../../../utils/exceptions/HttpError";

export interface AuthClaims extends JwtPayload {
  sub: string;
  email?: string;
  username?: string;
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return next(new HttpError(500, "JWT secret is not configured"));
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new HttpError(401, "Missing or invalid Authorization header"));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, secret) as AuthClaims;
    const responseLocals = res.locals as { user?: AuthClaims };
    responseLocals.user = decoded;
    next();
  } catch (error) {
    next(new HttpError(401, "Invalid or expired token"));
  }
};
