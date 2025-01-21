'use client';
import { useCartContext } from "@/context/CartContext";
import Image from "next/image";
import ProductCounter from "../ProductCounter";
import { useState } from "react";

export interface LandingPagePCProps {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
  }
  
  export const LandingPagePC: React.FC<LandingPagePCProps> = ({
    id,
    name,
    price,
    image,
    description,
  }) => {
    const { addToCart } = useCartContext();
    const [quantity, setQuantity] = useState<number>(1);

    const handleAddToCart = () => {
      addToCart({ product: { id, name, price, image, description }, quantity });
    };

    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl">
        <div className="h-full w-full align-middle flex justify-center">
          <Image src={image} alt={name} width={400} height={400} className="h-1/2 w-1/2 object-cover" />
        </div>
  
        <div className="p-4 flex flex-col gap-2">
          <h3 className="text-lg font-semibold text-gray-800 truncate">{name}</h3>
          <p className="text-xl font-bold text-cyan-600">${price.toFixed(2)}</p>
          <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
          <div className="flex items-center mt-2">
          <ProductCounter
            quantity={quantity}
            setQuantity={setQuantity}
            />
          </div>
          <button
          onClick={handleAddToCart} 
          className="mt-4 bg-cyan-700 text-white py-2 px-0 w-1/2 rounded-full hover:bg-cyan-800 transition-colors">
            Add to cart
          </button>
        </div>
      </div>
    );
  };
  
  export default LandingPagePC;
  