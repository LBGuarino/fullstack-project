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

interface ProductWQuantity {
  productId: number;
  quantity: number;
}

export interface CreateOrderDto {
  userId: number;
  products: ProductWQuantity[];
  paymentMethodId: string;
  orderData: OrderData;
}
