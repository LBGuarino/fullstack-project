import LoginUserDto from "../dtos/loginUser.dto";
import RegisterUserDto from "../dtos/registerUser.dto";
import { User } from "../entities/User";
import { UserRepository } from "../repositories/user.repository";
import { ClientError } from "../utils/errors";
import {
  checkPasswordService,
  createCredentialService,
} from "./credential.service";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/envs";
import { Cart } from "../entities/Cart";
import { CartRepository } from "../repositories/cart.repository";
import { ProductRepository } from "../repositories/product.repository";
import { CartItemRepository } from "../repositories/cartItem.repository";

export const checkUserExists = async (email: string): Promise<boolean> => {
  const user = await UserRepository.findOneBy({ email });
  return !!user;
};

export const registerUserService = async (
  registerUserDto: RegisterUserDto
): Promise<User> => {
  const user = await UserRepository.create(registerUserDto);
  await UserRepository.save(user);
  const credential = await createCredentialService({
    password: registerUserDto.password,
  });
  user.credential = credential;
  await UserRepository.save(user);
  const cart = CartRepository.create({id: user.id, user});
  await CartRepository.save(cart);
  return user;
};

export const loginUserService = async (
  loginUserDto: LoginUserDto
): Promise<{ token: string; user: User }> => {
  const user: User | null = await UserRepository.findOne({
    where: {
      email: loginUserDto.email,
    },
    relations: ["credential", "orders"],
  });
  if (!user) throw new Error("User not found");
  if (
    await checkPasswordService(loginUserDto.password, user.credential.password)
  ) {
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    return {
      user,
      token,
    };
  } else {
    throw new ClientError("Invalid email or password");
  }
};

export const getCartService = async ({ userId }: { userId: number }): Promise<Cart> => {
  const userCart = await CartRepository.findOne({
    where: { user: { id: userId } },
    relations: ["items", "items.product"],
  });
  if (!userCart) {
    throw new ClientError("Cart not found");
  }
  return userCart;
};

export const addToCartService = async ({ userId, productId, quantity }: { userId: number, productId: number, quantity: number }): Promise<Cart> => {
  const userCart = await CartRepository.findOne({
    where: { user: { id: userId } },
    relations: ["items", "items.product"],
  });
  if (!userCart) {
    throw new ClientError("Cart not found");
  }
  const product = await ProductRepository.findOne({
    where: { id: productId },
    relations: ["category"],
  });
  if (!product) {
    throw new ClientError("Product not found");
  }

  let cartItem = userCart.items.find((item) => item.product.id === productId);
  if (cartItem) {
    cartItem.quantity += quantity;
  } else {
    cartItem = CartItemRepository.create({
      cart: userCart,
      product,
      quantity,
    });
    userCart.items.push(cartItem);
  }

  await CartItemRepository.save(cartItem);
  return userCart;
};

export const removeFromCartService = async ({ productId, userId }: { productId: number, userId: number }): Promise<Cart> => {
  const userCart = await CartRepository.findOne({
    where: { user: { id: userId } },
    relations: ["items", "items.product"],
  });
  if (!userCart) {
    throw new ClientError("Cart not found");
  }

  const cartItem = userCart.items.find((item) => item.product.id === productId);
  if (!cartItem) {
    throw new ClientError("Product not in cart");
  }

  await CartItemRepository.remove(cartItem);
  return userCart;
};

export const removeAllFromCartService = async ({ userId }: { userId: number }): Promise<Cart> => {
  const userCart = await CartRepository.findOne({
    where: { user: { id: userId } },
    relations: ["items", "items.product"],
  });
  if (!userCart) {
    throw new ClientError("Cart not found");
  }

  await CartItemRepository.remove(userCart.items);
  return userCart;
};