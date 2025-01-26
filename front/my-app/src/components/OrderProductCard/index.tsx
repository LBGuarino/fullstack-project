import Image from "next/image";
import { OrderProduct } from "@/interfaces/IOrder";

export interface OrderProductCardProps {
  id: number;
  status: string;
  date: Date;
  orderProducts: OrderProduct[];
}

export default function OrderProductCard({
  id,
  status,
  date,
  orderProducts,
}: OrderProductCardProps) {
  return (
    <div className="min-w-[280px] max-w-sm bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 snap-center flex-shrink-0">
      <div className="px-4 py-3 border-b border-gray-200">
        <p className="text-sm font-semibold text-cyan-600">
          Order ID: {id}
        </p>
        <p className="text-sm text-gray-700">
          Status: {status}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Placed on: {new Date(date).toLocaleDateString()}
        </p>
      </div>

      <div className="p-4 flex flex-col gap-4">
        {orderProducts.map((p) => (
          <div key={p.product.id} className="flex items-center gap-3">
            <Image
              src={p.product.image}
              alt={p.product.name}
              width={64}
              height={64}
              className="object-cover rounded"
            />
            <div>
              <p className="text-sm font-medium text-gray-800">
                {p.product.name}
              </p>
              <p className="text-sm text-gray-600">
                ${p.product.price.toFixed(2)}
              </p>
              <p className="text-sm text-gray-600">
                Quantity: {p.quantity}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
