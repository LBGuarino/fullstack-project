'use client';

import { useState, useContext, ReactNode, useEffect, createContext } from "react";
import axios, { AxiosError } from "axios";
import { useAuth } from "./usersContext";

export interface ProductDetails {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
}

export interface CartItem {
    product: ProductDetails;
    quantity: number;
}


export interface CartContextValue {
    productsInCart: CartItem[];
    addToCart: (product: CartItem) => Promise<void>;
    removeFromCart: (productId: number) => Promise<void>;
    updateQuantity: (productId: number, quantity: number) => Promise<void>;
    clearCart: () => Promise<void>;
    fetchCart: () => Promise<void>;
    loading: boolean;
    error: string | null;
}

export const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
    const [productsInCart, setProductsInCart] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { logout } = useAuth();

    const fetchCart = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await axios.get("/api/users/cart", { withCredentials: true });
      
          if (response.status === 401) {
            logout();
            return;
          }
      
          setProductsInCart(response.data.items.map((item: CartItem) => ({
            product: item.product,
            quantity: item.quantity,
          })));
        } catch (error) {
          console.error("Error fetching cart:", error);
        } finally {
          setLoading(false);
        }
      };
    useEffect(() => {
        fetchCart();
    }, []);

    const addToCart = async (product: CartItem) => {
        setLoading(true);
        setError(null);
        try {
            const permission = await axios.get(`/api/users/cart`, {
                withCredentials: true,
            });
            if (permission.status === 401) {
                window.location.href = "/login";
            }
        } catch (error) {
            const err = error as AxiosError;
            if (err) {
                window.location.href = "/login";
            }
        }
        try {
            await axios.post(
                `/api/users/cart`,
                { productId: product.product.id, quantity: product.quantity },
                { withCredentials: true }
            );
            await fetchCart();
        } catch (err) {
            setError("Error adding to cart");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const removeFromCart = async (productId: number) => {
        setLoading(true);
        setError(null);
        try {
            await axios.delete(`/api/users/cart/${productId}`, {
                withCredentials: true,
            });
            await fetchCart();
        } catch (err) {
            setError("Error removing from cart");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const updateQuantity = async (productId: number, newQuantity: number) => {
        setLoading(true);
        setError(null);
        try {
          if (newQuantity < 1) {
            await axios.delete(`/api/users/cart/${productId}`, { 
              withCredentials: true 
            });
          } else {
            await axios.patch(
              `/api/users/cart/${productId}`,
              { quantity: newQuantity },
              { withCredentials: true }
            );
          }
          await fetchCart();
        } catch (err) {
          setError("Error updating quantity");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      
    const clearCart = async () => {
        setLoading(true);
        setError(null);
        try {
            setProductsInCart([]);
            await axios.delete(`/api/users/cart`, {
                withCredentials: true,
            });
        } catch (err) {
            setError("Error clearing cart");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <CartContext.Provider
            value={{
                productsInCart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                fetchCart,
                loading,
                error,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCartContext() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCartContext must be used inside <CartProvider>");
    }
    return context;
}
