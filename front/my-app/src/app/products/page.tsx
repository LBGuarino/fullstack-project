'use client'
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
    <div className="flex flex-row flex-wrap gap-8 p-10 justify-center items-center">
      {products.map(({ id, name, price, image, description }) => (
        <ProductCard
          key={id}
          name={name}
          price={price}
          image={image}
          description={description}
        />
      ))}
    </div>
  );
}
