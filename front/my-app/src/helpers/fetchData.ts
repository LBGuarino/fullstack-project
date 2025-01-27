import { DropdownMenuProps } from "@/components/DropdownMenu";
import { ICategory } from "@/interfaces/ICategory";
import { IProduct } from "@/interfaces/IProduct";


export async function fetchDropdownData(): Promise<DropdownMenuProps> {
  const res = await fetch("http://localhost:3001/products/categories");
  const data: ICategory[] = await res.json();

  const categories = data.map(({ name, id }) => ({
    name,
    id,
  }));  

  console.log(categories);

  const response = await fetch("http://localhost:3001/products")
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

  console.log(popularProducts);

  return {
  categories,
  popularProducts,
  };
}
