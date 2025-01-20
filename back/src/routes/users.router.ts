import { Request, Response, Router } from "express";
import validateUserRegister from "../middlewares/userRegister.middleware";
import validateUserLogin from "../middlewares/userLogin.middleware";
import { addToCart, getCart, getSession, login, logout, registerUser, removeFromCart } from "../controllers/user.controller";
import checkLogin from "../middlewares/checkLogin.middleware";
import { OrderRepository } from "../repositories/order.repository";

const usersRouter = Router();

usersRouter.post("/register", validateUserRegister, registerUser);

usersRouter.post("/logout", logout);

usersRouter.post("/login", validateUserLogin, login);

usersRouter.get("/orders", checkLogin, async (req: Request, res: Response) => {
  const { userId } = req.body;
  const orders = await OrderRepository.find({
    relations: ["products"],
    where: { user: { id: userId } },
  });

  res.send(orders);
});

usersRouter.get('/cart', checkLogin, getCart);

usersRouter.post('/cart', checkLogin, addToCart);

usersRouter.delete("/cart/:productId", checkLogin, removeFromCart);

usersRouter.get("/session", getSession);

export default usersRouter;
