import { CategoryPagePC } from "@/components/CategoryPagePC";
import { fetchProductsData } from "@/helpers/fetchData";
import { Breadcrumbs } from "@mui/material";
import Link from "next/link";

interface CategoryPageProps {
  params: { category: string };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const { products } = await fetchProductsData({ params: { category } });

  return (
    <div className="max-w-screen-xl mx-auto p-8">
      <div className="mb-8">
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
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <CategoryPagePC key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}
