'use client';
import { DropdownMenuProps } from "@/components/DropdownMenu";
import { ICategory } from "@/interfaces/ICategory";
import { IProduct } from "@/interfaces/IProduct";

export interface CategoryPageProps {
  products: IProduct[];
  category: string;
}

const handleApiError = (error: unknown, context: string) => {
  console.error(`Error in ${context}:`, error);
  throw new Error(typeof error === 'string' ? error : 'Failed to fetch data');
};

const validateResponse = async (response: Response, endpoint: string) => {
  if (!response.ok) {
    const clonedResponse = response.clone();
    const contentType = clonedResponse.headers.get("content-type");

    if (!contentType || !contentType.includes("application/json")) {
      const errorText = await clonedResponse.text();
      console.error(`API Error (not JSON) at ${endpoint}:`, errorText);
      throw new Error(`API Error at ${endpoint}: Server returned non-JSON response`);
    }

    const errorData = await clonedResponse.json();
    throw new Error(
      `API Error: ${endpoint} - ${response.status} ${response.statusText} - ${errorData.message || 'Unknown error'}`
    );
  }
  return response;
};

const BACKEND_URL = 'https://fullstack-project-back-mtag.onrender.com';
const isServer = typeof window === "undefined";

export const fetchDropdownData = async (): Promise<DropdownMenuProps> => {
  try {
    const baseURL = isServer ? BACKEND_URL : "/api";

    const categoriesResponse = await fetch(`${baseURL}/products/categories`);

    await validateResponse(categoriesResponse, `${baseURL}/products/categories`);
    
    const categoriesData: ICategory[] = await categoriesResponse.json();
    const validCategories = categoriesData.map(({ name, id }) => ({ name, id }));

    const productsResponse = await fetch(`${baseURL}/products`);
    await validateResponse(productsResponse, `${baseURL}/products`);

    const productsData: IProduct[] = await productsResponse.json();
    const validProducts = productsData.map(({ name, id, image, category }) => ({
      name, id, image, category: { id: category.id, name: category.name }
    }));

    return {
      categories: validCategories,
      popularProducts: validProducts,
    };

  } catch (error) {
    return handleApiError(error, "fetchDropdownData");
  }
};

export const fetchProductsData = async ({ 
  params 
}: { 
  params: { category: string } 
}) => {
  try {
    const response = await fetch(`/api/products/categories/${params.category}`
    );
    await validateResponse(response, `/api/products/categories/${params.category}`);
    
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