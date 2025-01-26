'use client';

import OrderProductCard from "@/components/OrderProductCard";
import { useAuth } from "@/context/usersContext";

export default function MyOrders() {
  const { orders } = useAuth();

  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-br from-gray-100 to-white px-4 py-8">
      <h1 className="text-3xl md:text-3xl font-light text-center text-gray-800 mb-6">
        My Orders
      </h1>

      <div className="relative">
        <div className="flex flex-row gap-6 overflow-x-auto snap-x snap-mandatory px-2 py-4">
          {orders.map((order) => (
            <OrderProductCard
              key={order.id}
              id={order.id}
              status={order.status}
              date={order.date}
              orderProducts={order.orderProducts}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
