import { ProductPageCard } from '@/components/ProductPageCard';
import { IProduct } from '@/interfaces/IProduct';
import { Breadcrumbs } from '@mui/material';
import Link from 'next/link';
import { JSX } from 'react';

interface ProductPageProps {
  params: { category: string; slug: string };
}

export default async function ProductPage({ params }: ProductPageProps): Promise<JSX.Element> {
  const { category, slug } = await params;

  const response = await fetch(`http://localhost:3001/products/categories/${category}/${slug}`);
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
