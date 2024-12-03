/* eslint-disable @typescript-eslint/quotes */
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import { router as authRouter } from "./router/auth";

const app = express();
console.log("server hitttt 🚀");
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(authRouter);

export default app;
