import { DropdownMenuProps } from "@/components/DropdownMenu";
import { ICategory } from "@/interfaces/ICategory";
import { IProduct } from "@/interfaces/IProduct";

export interface CategoryPageProps {
  products: IProduct[];
  category: string;
}

const API_BASE_PATH = process.env.NEXT_PUBLIC_API_URL || '';

const handleApiError = (error: unknown, context: string) => {
  console.error(`Error in ${context}:`, error);
  throw new Error(typeof error === 'string' ? error : 'Failed to fetch data');
};

const validateResponse = async (response: Response, endpoint: string) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      `API Error: ${endpoint} - ${response.status} ${response.statusText} - ${errorData.message || 'Unknown error'}`
    );
  }
  return response;
};

export const fetchDropdownData = async (): Promise<DropdownMenuProps> => {
  try {
    // Fetch categories
    const categoriesResponse = await fetch(
      `${API_BASE_PATH}/products/categories`
    );
    await validateResponse(categoriesResponse,`${API_BASE_PATH}/products/categories`
    );
    
    const categoriesData: ICategory[] = await categoriesResponse.json();
    const validCategories = categoriesData.map(({ name, id }) => {
      if (!name || !id) throw new Error("Invalid category structure");
      return { name, id };
    });

    // Fetch products
    const productsResponse = await fetch(
      `${API_BASE_PATH}/products/categories`
    );
    await validateResponse(productsResponse, '/products');
    
    const productsData: IProduct[] = await productsResponse.json();
    const validProducts = productsData.map(({ name, id, image, category }) => {
      if (!name || !id || !image || !category) {
        throw new Error("Invalid product structure");
      }
      return {
        name,
        id,
        image,
        category: { id: category.id, name: category.name }
      };
    });

    return {
      categories: validCategories,
      popularProducts: validProducts,
    };

  } catch (error) {
    return handleApiError(error, 'fetchDropdownData');
  }
};

export const fetchProductsData = async ({ 
  params 
}: { 
  params: { category: string } 
}) => {
  try {
    const response = await fetch(`${API_BASE_PATH}/products/categories/${params.category}`
    );
    await validateResponse(response, `${API_BASE_PATH}/products/categories/${params.category}`);
    
    const products: IProduct[] = await response.json();
    const validProducts = products.map(product => {
      if (!product.id || !product.name || !product.category) {
        throw new Error("Invalid product structure");
      }
      return product;
    });

    return {
      products: validProducts,
      category: params.category,
    };

  } catch (error) {
    return handleApiError(error, 'fetchProductsData');
  }
};