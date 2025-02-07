import express from "express"
import { publicRouter } from "../route/public-api";
import { errorMiddleware } from "../middleware/error-middleware";
import { authRouter } from "../route/auth-api";

export const app = express();
const port: number = 8000;

// Middleware untuk parsing form-data
//app.use(express.urlencoded({ extended: true }));

app.use(express.urlencoded({ extended: true }));
app.use(publicRouter);
app.use(authRouter);
app.use(errorMiddleware);


app.listen(port, () => {
    console.log(`listen on http://localhost:${port}/`);
});