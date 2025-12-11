import { Router } from "express";

const publicRoutes = Router();

publicRoutes.get("/health", (_req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Service is healthy",
    timestamp: new Date().toISOString(),
  });
});

export default publicRoutes;
