import { DropdownMenuProps } from "@/components/DropdownMenu";
import { ICategory } from "@/interfaces/ICategory";

export async function fetchDropdownData(): Promise<DropdownMenuProps> {
  const res = await fetch("http://localhost:3001/products/categories");
  const data: ICategory[] = await res.json();

  const categories = data.map(({ name, id, products }) => ({
    name,
    products,
    id,
  }));  

  const popularProducts = data.flatMap(({products}) => products.map((p) => ({
    id: p.id,
    name: p.name,
    price: p.price,
    image: p.image, 
    description: p.description,
    categoryId: p.categoryId
  })));
  
  return {
    categories,
    popularProducts,
  };
}
