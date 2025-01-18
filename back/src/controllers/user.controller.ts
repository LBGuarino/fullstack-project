import { Request, Response } from "express";
import { catchedController } from "../utils/catchedController";
import {
  loginUserService,
  registerUserService,
} from "../services/user.service";

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

export const login = catchedController(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await loginUserService({ email, password });
  res.cookie('token', user.token, {
    httpOnly: true,
    secure: false,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24 * 7,
    path: '/',
  })
  res.status(200).send({
    login: true,
    user: user.user,
  });
});

export const logout = catchedController(async (req: Request, res: Response) => {
  res.clearCookie('token', { path: '/' });
  return res.json({ message : 'Logout successful' });
});
