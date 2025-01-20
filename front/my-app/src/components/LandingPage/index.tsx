'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import CarouselComponent from "../Carousel";
import LandingPagePC from "../LandingPagePC";
import { getProducts } from "@/helpers/getProducts";
import { IProduct } from "@/interfaces/IProduct";

export default function LandingPage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const blurIntensity = Math.min(scrollY / 300, 1);
  const backgroundStyle = {
    filter: `blur(${blurIntensity * 10}px)`,
    opacity: `${1 - blurIntensity}`,
    transition: "filter 0.3s ease, opacity 0.3s ease",
  };

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
    <div className="relative w-screen">
      <div className="relative h-[100vh] overflow-hidden">
        <Image
          src="/4.jpg"
          alt="Background"
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center",
            ...backgroundStyle,
          }}
          priority
        />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-gray-50"></div>
      </div>

      <div className="relative z-10 bg-gray-50 py-8 px-4">
        <CarouselComponent>
          {products.map(({ id, name, price, image, description }) => (
            <LandingPagePC
              key={id}
              id={id}
              name={name}
              price={price}
              image={image}
              description={description}
            />
          ))}
        </CarouselComponent>
      </div>
    </div>
  );
}
