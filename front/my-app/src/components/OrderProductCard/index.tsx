import { CartItem } from "@/context/CartContext";
import { OrderProduct } from "@/interfaces/IOrder";
import Image from "next/image";

export interface OrderProductCardProps {
    id: number;
    status: string;
    date: Date;
    orderProducts: OrderProduct[];
  }
export const OrderProductCard: React.FC<OrderProductCardProps> = ({
    id,
    status,
    date,
    orderProducts,
}) => {
    return (
        <>

        <div className="bg-white rounded-md shadow-sm hover:shadow-md transition-shadow duration-200 flex items-center p-3 gap-4" key={id}>
            <div className="flex flex-col justify-between flex-1">
                <h3 className="text-sm font-medium text-gray-800 truncate">{status}</h3>
                <p className="text-sm font-semibold text-cyan-600"></p>
                {orderProducts.map((p) => (
                <div className="text-sm text-gray-500" key={p.product.id}>
                    <p className="text-sm text-gray-600">{p.product.name}</p>
                    <p className="text-sm text-gray-600">${p.product.price.toFixed(2)}</p>
                    <Image src={p.product.image} alt={p.product.name} width={100} height={100}/>
                    <p className="text-sm text-gray-600">Quantity: {p.quantity}</p>
                </div>
                ))}
            </div>
        </div>
        </>
    )
}

export default OrderProductCard;