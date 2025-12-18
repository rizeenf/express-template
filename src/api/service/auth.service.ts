import jwt from "jsonwebtoken";
import { HttpError } from "../../utils/exceptions/HttpError";
import { AuthClaims } from "../middleware/auth/auth.middleware";

export interface AuthTokenResponse {
  token: string;
  expiresIn: string | number;
}

export class AuthService {
  private getSecret(): string {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new HttpError(500, "JWT secret is not configured");
    }
    return secret;
  }

  private getExpiration(): string | number {
    return process.env.JWT_EXPIRES_IN || "1h";
  }

  public login(email?: string, password?: string): AuthTokenResponse {
    if (!email || !password) {
      throw new HttpError(400, "Email and password are required");
    }

    // In a real application you'd verify against persisted users.
    if (password !== "password123") {
      throw new HttpError(401, "Invalid credentials");
    }

    const expiresIn = this.getExpiration();
    const token = jwt
      .sign(
        { 
          sub: email, 
          email 
        },
        this.getSecret(),
      );

    return { token, expiresIn };
  }
}
