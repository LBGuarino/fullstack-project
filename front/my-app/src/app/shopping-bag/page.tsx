'use client';
import { GoogleMapsProvider } from "@/components/GoogleMapsProvider";
import Order from "@/components/Order";
import ShoppingCartPC from "@/components/ShoppingCartPC";
import { useCartContext } from "@/context/CartContext";
import { useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

export default function ShoppingBag() {
    const { fetchCart, productsInCart } = useCartContext();

      useEffect(() => {
        fetchCart();
      }, []);

    const totalAmount = productsInCart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    
    return (
        
    <div className="flex flex-col md:flex-row w-full h-screen">
        <Elements stripe={stripePromise}>
        <GoogleMapsProvider>
            <div className="flex-1 bg-gray-100 flex items-center justify-center p-4">
                <Order
                    products={productsInCart}
                    totalAmount={totalAmount}
                />
            </div>
        </GoogleMapsProvider>
        </Elements>
        <div className="flex-1 bg-gray-50 p-2 flex flex-col gap-5 overflow-y-auto">
            <h2 className="text-2xl font-light text-center p-3 mt-3">Your Shopping Bag</h2>
            <hr className="border-gray-200 border-2" />
            {productsInCart.map((product) => (
            <ShoppingCartPC
              key={product.product.id}
              item={product}
            />
            ))}
            <hr className="border-gray-200 border-2" />
            <div className="flex justify-between p-3 mb-8">
                <h2 className="text-2xl font-light text-center p-3 mt-3">Total:</h2>
                <h2 className="text-2xl font-light text-center p-3 mt-3">${productsInCart.reduce((acc, item) => acc + item.product.price * item.quantity, 0).toFixed(2)}</h2>
                
                
                
            </div>
        </div>
    </div>
    )
};