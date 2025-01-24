import { CreateOrderDto } from "../dtos/createOrderDto";
import { Order } from "../entities/Order";
import { OrderRepository } from "../repositories/order.repository";
import { OrderDataRepository } from "../repositories/orderData.repository";
import { OrderProductRepository } from "../repositories/orderProduct.repository";
import { ProductRepository } from "../repositories/product.repository";
import { UserRepository } from "../repositories/user.repository";

export const createOrderService = async (
  createOrderDto: CreateOrderDto
): Promise<Order> => {
  const productsF = [];

  for await (const item of createOrderDto.products) {
    const product = await ProductRepository.findOneBy({ id: item.productId });
    if (!product) throw new Error("Product not found");
    productsF.push({ product, quantity: item.quantity });
  }

  const userF = await UserRepository.findOneBy({ id: createOrderDto.userId });
  if (!userF) throw new Error("User not found");

  const newOrderData = OrderDataRepository.create();
  newOrderData.name = createOrderDto.orderData.name;
  newOrderData.phone = createOrderDto.orderData.phone;
  newOrderData.address = `${createOrderDto.orderData.address.street}, ${createOrderDto.orderData.address.city}, ${createOrderDto.orderData.address.postalCode}, ${createOrderDto.orderData.address.country}`;
  newOrderData.email = createOrderDto.orderData.email;
  newOrderData.pickupPoint = createOrderDto.orderData.pickupPoint;
  
  const newOrder = OrderRepository.create();
  newOrder.status = "approved";
  newOrder.date = new Date();
  newOrder.paymentMethodId = createOrderDto.paymentMethodId;
  newOrder.user = userF;
  newOrder.orderData = newOrderData;
  newOrder.orderProducts = productsF.map(({ product, quantity }) => {
    const orderProduct = OrderProductRepository.create();
    orderProduct.product = product;
    orderProduct.quantity = quantity;
    return orderProduct;
  })

  const savedOrder = await OrderRepository.save(newOrder);
  return savedOrder;
};
