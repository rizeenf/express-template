import { NextFunction, Request, Response } from "express";
import { AuthService } from "../service/auth.service";
import { AuthClaims } from "../middleware/auth/auth.middleware";

export class AuthController {
  private readonly authService: AuthService;
  // constructor(private readonly authService: AuthService) {}
  constructor(authService: AuthService) {
    this.authService = authService
  }

  public login = (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const result = this.authService.login(email, password);

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  public protected = (_req: Request, res: Response, next: NextFunction) => {
    try {
      const user = (res.locals as { user?: AuthClaims }).user;

      res.json({
        success: true,
        data: {
          message: "Authenticated access granted",
          user,
        },
      });
    } catch (error) {
      next(error);
    }
  };
}
