import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import router from "./routes";
import morgan from "morgan";
import cookieParser from "cookie-parser";

const app = express();

app.set("trust proxy", 1);
app.use(cors({
  origin: [
    'https://www.thescentedshop.blog', // Subdominio principal
    'https://thescentedshop.blog', // Dominio raíz
    'http://localhost:3000'
  ],
  credentials: true,
  exposedHeaders: ["set-cookie"],
  allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  maxAge: 86400,
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
