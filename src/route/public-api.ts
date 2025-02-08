import express from "express";
import { UserController } from "../controller/user-controller";
import { apiKeyMiddleware } from "../middleware/apiKey-middleware";

export const publicRouter = express.Router();
publicRouter.use(apiKeyMiddleware);

publicRouter.post("/api/users", UserController.register);
publicRouter.post("/api/users/login", UserController.login);