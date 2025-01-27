'use client'
import CategoryPagePC from "@/components/CategoryPagePC";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/helpers/getProducts";
import { IProduct } from "@/interfaces/IProduct";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    getProducts()
      .then((res) => {
        setProducts(res);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto p-8"> 
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map(({ id, name, price, image, description }) => (
        <CategoryPagePC
          key={id}
          id={id}
          name={name}
          price={price}
          image={image}
          description={description}
        />
      ))}
    </div>
    </div>
  );
}
