import express from "express"
import { authMiddleware } from "../middleware/auth-middleware";
import { UserController } from "../controller/user-controller";
import { ContactController } from "../controller/contact-controller";
import { AddressController } from "../controller/address-controller";

export const authRouter = express.Router();
authRouter.use(authMiddleware);

// User AUth Route
authRouter.get('/api/users/current', UserController.get);
authRouter.patch('/api/users/current', UserController.update);
authRouter.delete('/api/users/current', UserController.logout);

// Contact API
authRouter.post('/api/contact', ContactController.create);
authRouter.get('/api/contact/:contactId(\\d+)', ContactController.get);
authRouter.put('/api/contact/:contactId(\\d+)', ContactController.update);
authRouter.delete('/api/contact/:contactId(\\d+)', ContactController.delete);
authRouter.get('/api/contact', ContactController.search);

// Address API
authRouter.post('/api/contact/:contactId(\\d+)/addresses', AddressController.create);
authRouter.get('/api/contact/:contactId(\\d+)/addresses/:addressId(\\d+)', AddressController.get);
authRouter.put('/api/contact/:contactId(\\d+)/addresses/:addressId(\\d+)', AddressController.update);
authRouter.delete('/api/contact/:contactId(\\d+)/addresses/:addressId(\\d+)', AddressController.remove);
authRouter.get('/api/contact/:contactId(\\d+)/addresses', AddressController.list);