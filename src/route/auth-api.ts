import express from "express"
import { authMiddleware } from "../middleware/auth-middleware";
import { UserController } from "../controller/user-controller";
import { ContactController } from "../controller/contact-controller";

export const authRouter = express.Router();
authRouter.use(authMiddleware);

// User AUth Route
authRouter.get('/api/users/current', UserController.get);
authRouter.patch('/api/users/current', UserController.update);
authRouter.delete('/api/users/current', UserController.logout);

// Contact API
authRouter.post('/api/contact', ContactController.create);
