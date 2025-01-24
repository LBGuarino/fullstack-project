'use client';
import OrderProductCard from "@/components/OrderProductCard";
import { useAuth } from "@/context/usersContext";

export default function ConfirmationPage() {
    const { orders } = useAuth();
    
    return (
        <>
        <div className="flex flex-col md:flex-row w-full h-screen">
            <div className="flex-1 bg-gray-100 flex items-center justify-center gap-4 p-4">
                <h1 className="text-3xl font-light text-center">Thank you for your order!</h1>
                <p className="text-center font-extralight p-8">Your order has been placed successfully.
                    We will send you an email with your order details.</p>
            </div>

            <div className="flex-1 bg-gray-100 flex items-center justify-center p-4">
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
        </>
    );
}   