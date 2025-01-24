'use client';

import { useState, useContext, ReactNode, useEffect, createContext } from "react";
import axios, { AxiosError } from "axios";
import { IOrder } from "@/interfaces/IOrder";

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
    updateQuantity: (product: CartItem) => Promise<void>;
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

    const fetchCart = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get("http://localhost:3001/users/cart", {
                withCredentials: true,
            });

            const items = response.data.items.map((item: any) => ({
                product: item.product,
                quantity: item.quantity,
            }));
            setProductsInCart(items);
        } catch (error) {
            const err = error as AxiosError;
            if (err.response?.status === 400) {
                setProductsInCart([]);
            } else {
            setError(err.message || "Unexpected error");
            console.error(err)}
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
            const permission = await axios.get("http://localhost:3001/users/cart", {
                withCredentials: true,
            });
        } catch (error) {
            const err = error as AxiosError;
            if (err) {
                window.location.href = "/login";
            }
        }
        try {
            await axios.post(
                "http://localhost:3001/users/cart",
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
            await axios.delete(`http://localhost:3001/users/cart/${productId}`, {
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

    const updateQuantity = async (product: CartItem) => {
        setLoading(true);
        setError(null);
        try {
            await axios.patch(
                `http://localhost:3001/users/cart/${product.product.id}`,
                { quantity: product.quantity },
                { withCredentials: true }
            );
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
            await axios.delete("http://localhost:3001/users/cart", {
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
