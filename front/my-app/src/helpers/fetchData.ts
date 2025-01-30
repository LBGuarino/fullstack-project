import { DropdownMenuProps } from "@/components/DropdownMenu";
import { ICategory } from "@/interfaces/ICategory";
import { IProduct } from "@/interfaces/IProduct";

export interface CategoryPageProps {
  products: IProduct[];
  category: string;
}

// Validar variable de entorno
const getApiUrl = (): string => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL no está definido en las variables de entorno");
  }
  return apiUrl;
};

export async function fetchDropdownData(): Promise<DropdownMenuProps> {
  const API_URL = getApiUrl();
  
  try {
    // Obtener categorías
    const categoriesUrl = new URL('/api/products/categories', API_URL).toString();
    const categoriesRes = await fetch(categoriesUrl);
    
    if (!categoriesRes.ok) {
      throw new Error(`Error ${categoriesRes.status}: ${categoriesRes.statusText}`);
    }
    
    const categoriesData: ICategory[] = await categoriesRes.json();
    
    // Validar estructura de categorías
    const categories = categoriesData.map(({ name, id }) => {
      if (!name || !id) {
        throw new Error("Estructura de categoría inválida");
      }
      return { name, id };
    });

    // Obtener productos populares
    const productsUrl = new URL('/api/products', API_URL).toString();
    const productsRes = await fetch(productsUrl);
    
    if (!productsRes.ok) {
      throw new Error(`Error ${productsRes.status}: ${productsRes.statusText}`);
    }
    
    const allProducts: IProduct[] = await productsRes.json();

    // Validar y mapear productos
    const popularProducts = allProducts.map(({ 
      name, 
      id, 
      image, 
      category 
    }) => {
      if (!name || !id || !image || !category) {
        throw new Error("Estructura de producto inválida");
      }
      return {
        name,
        id,
        image,
        category: {
          id: category.id,
          name: category.name
        }
      };
    });

    return {
      categories,
      popularProducts,
    };
    
  } catch (error) {
    console.error("Error fetching dropdown data:", error);
    throw new Error("No se pudieron cargar los datos. Intente recargar la página.");
  }
}

export async function fetchProductsData({ params }: { params: { category: string } }) {
  const API_URL = getApiUrl();
  const { category } = params;

  try {
    const url = new URL(`/api/products/categories/${category}`, API_URL).toString();
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const products: IProduct[] = await response.json();

    // Validar productos
    const validProducts = products.map(product => {
      if (!product.id || !product.name || !product.category) {
        throw new Error("Producto con estructura inválida");
      }
      return product;
    });

    return {
      products: validProducts,
      category,
    };
    
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error(`Error al cargar productos de ${category}`);
  }
}