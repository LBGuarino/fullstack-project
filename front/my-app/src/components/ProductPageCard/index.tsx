'use client';
import Image from "next/image";
import ProductCounter from "../ProductCounter";
import { useCartContext } from "@/context/CartContext";
import { useState } from "react";
import AnimatedPage from "../AnimatedPage";

export interface ProductPageCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: {
    id: number,
    name: string
  }
}

export const ProductPageCard: React.FC<ProductPageCardProps> = ({
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
    <AnimatedPage>
    <div className="flex flex-col md:flex-row gap-8">
      <div className="flex-1 flex items-center justify-center">
        <Image
          src={image}
          alt={name}
          width={300}
          height={300}
          className="object-cover rounded-md"
        />
      </div>

      <div className="flex-1 flex flex-col justify-start gap-4">
        <h1 className="text-2xl font-semibold text-gray-800 capitalize">{name}</h1>
        <p className="text-base text-gray-600 leading-relaxed">{description}</p>
        
        <p className="text-xl font-bold text-cyan-700">
          ${price.toFixed(2)}
        </p>

        <div className="flex flex-row items-center gap-4">
          <ProductCounter quantity={quantity} setQuantity={setQuantity} />
          <button
            onClick={handleAddToCart}
            className="
              bg-cyan-700 
              hover:bg-cyan-800 
              text-white 
              px-6 
              py-2 
              rounded-full 
              shadow 
              transition-all 
              duration-200
            "
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
    </AnimatedPage>
  );
};
