interface OrderData {
  name: string;
  phone: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  email: string;
  pickupPoint: number | undefined;
}

export interface CreateOrderDto {
  userId: number;
  products: number[];
  paymentMethodId: string;
  orderData: OrderData;
}
