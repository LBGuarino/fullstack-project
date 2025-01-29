import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import router from "./routes";
import morgan from "morgan";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
  origin: ["https://www.thescentedshop.blog", "https://thescentedshop.blog", "http://localhost:3000"],
  credentials: true,
  exposedHeaders: ["set-cookie"],
}));
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use(router);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.statusCode || 500).send({
    statusCode: err.statusCode || 500,
    message: err.message || "Internal Server Error",
  });
});

export default app;
