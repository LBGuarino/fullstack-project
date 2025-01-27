'use client';

import { ICategory } from "@/interfaces/ICategory";
import { IProduct } from "@/interfaces/IProduct";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";

export interface ProductWCategory {
  name: string;
  id: number;
  image: string;
  category: {
    id: number;
    name: string;
  }
}

export interface DropdownMenuProps {
  categories: ICategory[];
  popularProducts: ProductWCategory[];
}

const DropdownMenu = ({ categories, popularProducts }: DropdownMenuProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 200);
  };


  return (
    <div
      className="relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href="/products"
        className="hover:text-white transition-all duration-200 ease-in-out font-light"
      >
        Products
      </Link>

      {isDropdownOpen && (
        <div
          className="absolute left-0 top-full mt-2 w-[48em] max-w-5xl bg-white shadow-xl border-t border-gray-200 rounded-lg overflow-hidden z-50"
        >
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 p-6">
            <div className="col-span-2">
              <h4 className="text-base font-bold text-gray-700 uppercase mb-4 border-b pb-2">
                Category
              </h4>
              <ul className="space-y-2">
                {categories.map(({ id, name }) => (
                  <li key={id}>
                    <Link
                      href={`/categories/${name.toLowerCase()}`}
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-black hover:bg-gray-100 rounded-md px-2 py-1 transition-colors"
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-3">
              <h4 className="text-base font-bold text-gray-700 uppercase mb-4 border-b pb-2">
                Favourite Products
              </h4>
              <ul className="space-y-2">
                {popularProducts.map(({ id, name, image, category }) => (
                  <li key={id}>
                    <Link
                      href={`/products/${category.name.toLowerCase()}/${name.toLowerCase().replaceAll(' ', '-')}`}
                      className="flex items-center gap-4 text-sm text-gray-600 hover:text-black hover:bg-gray-100 rounded-md px-2 py-2 transition-colors"
                    >
                      <Image
                        src={image}
                        alt={name}
                        width={50}
                        height={50}
                        className="w-12 h-12 object-cover rounded-md border border-gray-200"
                      />
                      <span className="truncate">{name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
