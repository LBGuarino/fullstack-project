'use client';
import { useCartContext } from "@/context/CartContext";
import Image from "next/image";
import ProductCounter from "../ProductCounter";
import { useState } from "react";
import AnimatedPage from "../AnimatedPage";
import Link from "next/link";

export interface CategoryPagePCProps {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

export const CategoryPagePC: React.FC<CategoryPagePCProps> = ({
  id,
  name,
  price,
  image,
  description,
  category,
}) => {
  const { addToCart } = useCartContext();
  const [quantity, setQuantity] = useState<number>(1);

  const handleAddToCart = () => {
    addToCart({ product: { id, name, price, image, description }, quantity });
  };

  return (
    <AnimatedPage>
      <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col h-full">
        <div className="h-40 sm:h-52 md:h-64 lg:h-72 xl:h-80 flex justify-center items-center">
          <Link href={`/products/${category}/${name.toLowerCase().replaceAll(' ', '-')}`}>
            <Image
              src={image}
              alt={name}
              width={300}
              height={300}
              className="h-full w-auto object-contain"
            />
          </Link>
        </div>

        <div className="p-4 flex flex-col gap-3 flex-1">
          <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 truncate">
            {name}
          </h3>
          <p className="text-lg sm:text-xl md:text-2xl font-bold text-cyan-600">
            ${price.toFixed(2)}
          </p>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 line-clamp-3">
            {description}
          </p>

          <div className="flex items-center mt-auto">
            <ProductCounter quantity={quantity} setQuantity={setQuantity} />
          </div>

          <button
            onClick={handleAddToCart}
            className="mt-3 bg-cyan-700 text-white py-2 px-4 rounded-full hover:bg-cyan-800 transition-colors"
          >
            Add to cart
          </button>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default CategoryPagePC;
