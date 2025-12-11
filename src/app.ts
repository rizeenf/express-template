import express, { Request, Response, NextFunction } from "express";
import registerRoutes from "./api/route";
import { errorHandler } from "./api/middleware/error/error.middleware";

const app = express();

app.use(express.json());

// Request logger middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});


// Routes
registerRoutes(app);


app.use(errorHandler);

export default app;
