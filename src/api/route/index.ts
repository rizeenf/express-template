import { Express, Request, Response, Router } from "express";
import publicRoutes from "./public";
import authRoutes from "./auth";

const API_VERSION = process.env.API_VERSION || "v1";
const API_PREFIX = `/api/${API_VERSION}`

export const registerRoutes = (app: Express): void => {
  const router = Router();

  app.get("/", (req: Request, res: Response) => {
    res.json({
      message: "Hello from Express + TypeScript 🚀"
    });
  });

  // register all route groups here
  router.use(publicRoutes);
  router.use("/auth", authRoutes);

  app.use(API_PREFIX, router);
};


export default registerRoutes;
