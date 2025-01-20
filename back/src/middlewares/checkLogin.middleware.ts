import { NextFunction, Request, Response } from "express";
import { ClientError } from "../utils/errors";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/envs";
import { JwtPayload } from "../controllers/user.controller";

const checkLogin = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.token;
  if (!token) {
    return next(new ClientError("Token is required"));
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    if (!decoded.userId) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.body.userId = decoded.userId;
  } catch (error) {
    next(new ClientError("Invalid token"));
  }

  next();
};

export default checkLogin;
