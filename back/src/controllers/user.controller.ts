import { Request, Response } from "express";
import { catchedController } from "../utils/catchedController";
import {
  addToCartService,
  getCartService,
  loginUserService,
  registerUserService,
  removeAllFromCartService,
  removeFromCartService,
} from "../services/user.service";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/envs";
import { UserRepository } from "../repositories/user.repository";
import { ClientError } from "../utils/errors";

const isProduction = process.env.NODE_ENV === "production";

export interface JwtPayload {
  userId: number;
}

export const registerUser = catchedController(
  async (req: Request, res: Response) => {
    const { email, password, name, address, phone } = req.body;
    const newUser = await registerUserService({
      email,
      password,
      name,
      address,
      phone,
    });
    res.status(201).send(newUser);
  }
);

export const updateProfile = catchedController(async (req: Request, res: Response) => {
  const { name, address, phone, email } = req.body;
  const user = await UserRepository.findOne({
    where: { id: req.user?.id },
  });
  if (!user) throw new ClientError("User not found");
  await UserRepository.update(user, { name, address, phone, email });
  res.status(200).send(user);
});

export const login = catchedController(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await loginUserService({ email, password });
  res.cookie('token', user.token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 24 * 7,
    path: '/',
    domain: isProduction ? '.thescentedshop.blog' : undefined,
  })
  res.status(200).send({
    login: true,
    user: user.user,
    debug: {
      cookieDomain: isProduction ? '.thescentedshop.blog' : 'localhost'
    }
  });
});

export const getSession = catchedController(async (req: Request, res: Response) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "No session" });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    const user = await UserRepository.findOne({
      where: { id: decoded.userId },
      relations: ["orders", "cart"],
    });

    if (!user) {
      res.clearCookie('token', {
        domain: '.thescentedshop.blog',
        path: '/'
      });
      return res.status(401).json({ message: "User not found" });
    }

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 7,
      path: '/',
      domain: isProduction ? '.thescentedshop.blog' : undefined
    });

    return res.status(200).json({ user });
  } catch (error) {
    res.clearCookie('token', {
      domain: '.thescentedshop.blog',
      path: '/'
    });
    return res.status(401).json({ message: "Invalid or expired session" });
  }
});

export const logout = catchedController(async (req: Request, res: Response) => {
  res.clearCookie('token', { 
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
  });
  return res.json({ message : 'Logout successful' });
});

export const getCart = catchedController(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    throw new ClientError("User not authenticated", 401);
  }
  const cart = await getCartService({ userId });
  res.status(200).send(cart);
});

export const addToCart = catchedController(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { productId, quantity } = req.body;
  if (!userId) {
    throw new ClientError("User not authenticated", 401);
  }

  const cart = await addToCartService({ userId, productId, quantity });
  res.status(200).send(cart);
});

export const removeFromCart = catchedController(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const productId = parseInt(req.params.productId, 10);
  if (!userId) {
    throw new ClientError("User not authenticated", 401);
  }
  if (isNaN(productId)) {
    throw new ClientError("Invalid product ID", 400);
  }
  const cart = await removeFromCartService({ productId, userId });
  res.status(200).send(cart);
});

export const removeAllFromCart = catchedController(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    throw new ClientError("User not authenticated", 401);
  }
  const cart = await removeAllFromCartService({ userId });
  res.status(200).send(cart);
});
