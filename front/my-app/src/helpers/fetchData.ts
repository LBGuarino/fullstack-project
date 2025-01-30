import { DropdownMenuProps } from "@/components/DropdownMenu";
import { ICategory } from "@/interfaces/ICategory";
import { IProduct } from "@/interfaces/IProduct";

export interface CategoryPageProps {
  products: IProduct[];
  category: string;
}

export async function fetchDropdownData(): Promise<DropdownMenuProps> {
  try { 
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/categories`);
  const data: ICategory[] = await res.json()

  const categories = data.map(({ name, id }) => ({
    name,
    id,
  }));  

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`)
  const allProducts: IProduct[] = await response.json();

  const popularProducts = allProducts.map(({ 
    name, 
    id, 
    image, 
    category, 
  }) => ({ 
    name,
    id,
    image,
    category: {
      id: category.id,
      name: category.name
    }
  }));

  return {
  categories,
  popularProducts,
  }} catch (error) {
    console.error("Error fetching dropdown data:", error);
    throw error;
  }
}

export async function fetchProductsData({ params }: { params: { category: string } }) {
  const { category } = await params;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/categories/${category}`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch products for category: ${category}`);
    }

    const products: IProduct[] = await response.json();

    return {
      products,
      category,
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}
