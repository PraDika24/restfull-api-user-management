import express from "express"
import { authMiddleware } from "../middleware/auth-middleware";
import { UserController } from "../controller/user-controller";

export const authRouter = express.Router();
authRouter.use(authMiddleware);

// User AUth Route
authRouter.get('/api/users/current', UserController.get)