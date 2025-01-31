import { ProductPageCard } from '@/components/ProductPageCard';
import { IProduct } from '@/interfaces/IProduct';
import { Breadcrumbs } from '@mui/material';
import Link from 'next/link';

const BACKEND_URL = "https://fullstack-project-back-mtag.onrender.com"; 
const isServer = typeof window === "undefined"; 

interface ProductPageParams {
  params : {
    category: string;
    slug: string;
  }
}

export default async function ProductPage({ params }: ProductPageParams) {
  const { category, slug } = params;

  const baseURL = isServer ? BACKEND_URL : "";

  const response = await fetch(`${baseURL}/api/products/categories/${category}/${slug}`, {
    credentials: 'include'
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch product: ${response.statusText}`);
  }
  const product: IProduct = await response.json();

  return (
    <div className="p-4 max-w-screen-xl mx-auto text-inherit">
      <Breadcrumbs aria-label="breadcrumb" className="mb-4 text-sm text-gray-500">
        <Link href="/" className="hover:underline hover:text-cyan-700">
          Home
        </Link>
        <Link href="/products" className="hover:underline hover:text-cyan-700">
          Products
        </Link>
        <Link href={`/products/${category}`} className="hover:underline hover:text-cyan-700 capitalize">
          {category}
        </Link>
      </Breadcrumbs>

      <div className="bg-white p-4 rounded-md shadow-sm mt-10">
        <ProductPageCard {...product} />
      </div>
    </div>
  );
}