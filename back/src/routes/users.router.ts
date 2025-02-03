import { Request, Response, Router } from "express";
import validateUserRegister from "../middlewares/userRegister.middleware";
import validateUserLogin from "../middlewares/userLogin.middleware";
import { addToCart, getCart, getSession, login, logout, registerUser, removeAllFromCart, removeFromCart, updateProfile } from "../controllers/user.controller";
import checkLogin from "../middlewares/checkLogin.middleware";
import { OrderRepository } from "../repositories/order.repository";

const usersRouter = Router();

usersRouter.post("/register", validateUserRegister, registerUser);

usersRouter.put("/profile", checkLogin, updateProfile);

usersRouter.post("/logout", logout);

usersRouter.post("/login", validateUserLogin, login);

usersRouter.get("/orders", checkLogin, async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const orders = await OrderRepository.find({
    relations: ["orderProducts", "orderProducts.product"],
    where: { user: { id: userId } },
  });

  res.send(orders);
});

usersRouter.get('/cart', checkLogin, getCart);

usersRouter.post('/cart', checkLogin, addToCart);

usersRouter.delete("/cart/:productId", checkLogin, removeFromCart);

usersRouter.delete("/cart", checkLogin, removeAllFromCart);

usersRouter.get("/session", getSession);

export default usersRouter;
