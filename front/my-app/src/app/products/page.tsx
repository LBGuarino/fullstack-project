'use client';

import CategoryPagePC from "@/components/CategoryPagePC";
import { getProducts } from "@/helpers/getProducts";
import { IProduct } from "@/interfaces/IProduct";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [sortedProducts, setSortedProducts] = useState<IProduct[]>([]);
  const [sortOrder, setSortOrder] = useState<string>("default");

  useEffect(() => {
    getProducts()
      .then((res) => {
        setProducts(res);
        setSortedProducts(res);  
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOrder = e.target.value;
    setSortOrder(selectedOrder);

    let sortedArray = [...products];
    if (selectedOrder === "asc") {
      sortedArray.sort((a, b) => a.price - b.price);
    } else if (selectedOrder === "desc") {
      sortedArray.sort((a, b) => b.price - a.price);
    } else {
      sortedArray = [...products]; 
    }

    setSortedProducts(sortedArray);
  };

  return (
    <div className="max-w-screen-xl mx-auto p-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Sort by:</h2>
        <select
          value={sortOrder}
          onChange={handleSortChange}
          className="border border-gray-300 rounded-md px-3 py-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        >
          <option value="default">Default</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedProducts.map(({ id, name, price, image, description, category }) => (
          <CategoryPagePC
            key={id}
            id={id}
            name={name}
            price={price}
            image={image}
            description={description}
            category={category.name}
          />
        ))}
      </div>
    </div>
  );
}
