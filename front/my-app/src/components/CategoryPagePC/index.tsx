'use client';
import { useCartContext } from "@/context/CartContext";
import Image from "next/image";
import ProductCounter from "../ProductCounter";
import { useState } from "react";
import AnimatedPage from "../AnimatedPage";

export interface CategoryPagePCProps {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

export const CategoryPagePC: React.FC<CategoryPagePCProps> = ({
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
    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 overflow-hidden flex flex-col">
      <div className="h-48 sm:h-60 md:h-72 lg:h-80 flex justify-center items-center">
        <Image
          src={image}
          alt={name}
          width={300}
          height={300}
          className="h-full w-auto object-contain"
        />
      </div>

      <div className="p-4 flex flex-col gap-4 flex-1">
        <h3 className="text-lg md:text-xl font-semibold text-gray-800 truncate">
          {name}
        </h3>
        <p className="text-xl md:text-2xl font-bold text-cyan-600">
          ${price.toFixed(2)}
        </p>
        <p className="text-sm md:text-base text-gray-600 line-clamp-3">
          {description}
        </p>

        <div className="flex items-center mt-auto">
          <ProductCounter quantity={quantity} setQuantity={setQuantity} />
        </div>

        <button
          onClick={handleAddToCart}
          className="mt-4 bg-cyan-700 text-white py-2 px-4 w-full rounded-full hover:bg-cyan-800 transition-colors"
        >
          Add to cart
        </button>
      </div>
    </div>
    </AnimatedPage>
  );
};

export default CategoryPagePC;
