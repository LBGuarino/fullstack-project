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
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl overflow-hidden transition-shadow duration-300">
        <div className="relative group aspect-square sm:aspect-[4/3]">
          <Link 
          href={`/products/${category}/${name.toLowerCase().replaceAll(' ', '-')}`}
          className="block h-full w-full"
          >
          <div className="absolute inset-0 w-full h-full flex items-center justify-center">
            <Image 
            src={image} 
            alt={name} 
            className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
            height={300}
            width={300}
            />
          </div>
          </Link>
        </div>
  
        <div className="p-3 sm:p-4 flex flex-col gap-2">
          <h3 className="text-md sm:text-lg font-semibold text-gray-800 truncate">
            {name}
          </h3>
          <p className="text-lg sm:text-xl font-bold text-cyan-600">${price.toFixed(2)}</p>
          <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
          <div className="flex items-center mt-2">
          <ProductCounter
            quantity={quantity}
            setQuantity={setQuantity}
            />
          </div>
          <button
          onClick={handleAddToCart} 
          className="mt-4 bg-cyan-700 text-white py-2 px-4 w-full sm:w-1/2 rounded-full hover:bg-cyan-800 transition-colors">
            Add to cart
          </button>
        </div>
      </div>
    );
  };
  
  export default LandingPagePC;
  