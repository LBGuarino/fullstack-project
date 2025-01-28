'use client';

import { useState } from 'react';
import { GoogleMapsProvider } from "@/components/GoogleMapsProvider";
import Order from "@/components/Order";
import ShoppingCartPC from "@/components/ShoppingCartPC";
import { useCartContext } from "@/context/CartContext";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Link from 'next/link';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);


export default function ShoppingBag() {
  const { productsInCart } = useCartContext();
  const [showOrderMobile, setShowOrderMobile] = useState(false);

  const totalAmount = productsInCart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  
  const renderCart = () => (
    <>
      <h2 className="text-2xl font-light text-center p-3 mt-3">Your Shopping Bag</h2>
      <hr className="border-gray-200 border-2" />

      {productsInCart.map((product) => (
        <ShoppingCartPC key={product.product.id} item={product} />
      ))}

      <hr className="border-gray-200 border-2" />
      <div className="flex justify-between p-3 mb-8">
        <h2 className="text-2xl font-light text-center p-3 mt-3">Total:</h2>
        <h2 className="text-2xl font-light text-center p-3 mt-3">
          ${totalAmount.toFixed(2)}
        </h2>
      </div>
    </>
  );

  const renderOrder = () => (
    <Order products={productsInCart} totalAmount={totalAmount} />
  );

  return (
    <>
      {productsInCart.length > 0 ? (
              <Elements stripe={stripePromise}>
              <GoogleMapsProvider>
                <div className="block md:hidden w-full min-h-screen p-4">
                  {!showOrderMobile ? (
                    <div>
                      {renderCart()}
                      <button
                        onClick={() => setShowOrderMobile(true)}
                        className="
                          w-full 
                          bg-cyan-700 
                          text-white 
                          py-2 
                          px-4 
                          rounded 
                          hover:bg-cyan-800 
                          transition 
                          duration-150 
                          ease-in-out
                        "
                      >
                        Continue
                      </button>
                    </div>
                  ) : (
                    <div>
                      <button
                        onClick={() => setShowOrderMobile(false)}
                        className="mb-4 text-sm text-cyan-700 underline"
                      >
                        &larr; Back to Cart
                      </button>
                      {renderOrder()}
                    </div>
                  )}
                </div>
      
                <div className="hidden md:flex flex-row w-full h-screen">
                  <div className="flex-1 bg-gray-100 flex items-center justify-center p-4 overflow-y-auto">
                    {renderOrder()}
                  </div>
      
                  <div className="flex-1 bg-gray-50 p-2 flex flex-col gap-5 overflow-y-auto">
                    {renderCart()}
                  </div>
                </div>
              </GoogleMapsProvider>
            </Elements>
      ) : (
        <div className="w-full min-h-screen flex flex-col md:flex-row">
        <div className="flex-1 bg-gradient-to-br from-white to-cyan-50 flex flex-col items-center justify-center p-8">
          <h1 className="text-3xl md:text-4xl font-light text-center mb-4">
            {`Your shopping bag is empty :(`}
          </h1>
          <p className="text-base md:text-lg font-extralight text-center max-w-md leading-relaxed">
            Please add some products to your shopping bag.
          </p>
  
          <Link href="/products" className="bg-cyan-600 text-white hover:bg-cyan-700 transition-colors duration-200 font-semibold rounded-lg py-1 px-4 mt-8">
              Go to products
          </Link>
        </div>
      </div>
        )
    }
    </>
  );
}
