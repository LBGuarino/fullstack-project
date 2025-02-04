'use client';
import { useCartContext } from "@/context/CartContext";
import Image from "next/image";
import ProductCounter from "../ProductCounter";
import { useState } from "react";
import Link from "next/link";

export interface LandingPagePCProps {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
    category: string;
  }
  
  export const LandingPagePC: React.FC<LandingPagePCProps> = ({
    id,
    name,
    price,
    image,
    description,
    category
  }) => {
    const { addToCart } = useCartContext();
    const [quantity, setQuantity] = useState<number>(1);

    const handleAddToCart = () => {
      addToCart({ product: { id, name, price, image, description }, quantity });
    };

    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl">
        <div className="relative flex-grow group">
          <Link 
          href={`/products/${category}/${name.toLowerCase().replaceAll(' ', '-')}`}
          className="block h-full w-full"
          >
          <div className="relative justify-center items-center flex h-full w-full">
            <Image 
            src={image} 
            alt={name} 
            className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
            height={400}
            width={400}
            />
          </div>
          </Link>
        </div>
  
        <div className="p-4 flex flex-col gap-2">
          <h3 className="text-lg font-semibold text-gray-800 truncate">
            {name}
          </h3>
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
  