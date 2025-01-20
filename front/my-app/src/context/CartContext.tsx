'use client'

import { useState, useContext, ReactNode, useEffect, createContext } from "react";
import { useAuth } from "./usersContext";

interface ProductId {
    id: number;
    quantity: number;
}

export interface CartContextValue {
    productsInCart: ProductId[];
    addToCart: (productId: number, quantity: number) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
}

export const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
    const [productsInCart, setProductsInCart] = useState<ProductId[]>([]);

    useEffect(() => {
        const savedCart = typeof window !== 'undefined'
        ? localStorage.getItem('cart')
        : null;

        if (savedCart) {
            setProductsInCart(JSON.parse(savedCart));
        }
    }, []);

    const syncCart = (cart: ProductId[]) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    };

    const { user } = useAuth();

    const addToCart = (productId: number, quantity: number) => {
        if (!user) {
            window.location.href = '/login';
        } else {
            setProductsInCart((prev) => {
                const updatedCart = [...prev];
                const existingProducts = updatedCart.findIndex(
                    (p) => p.id === productId
                );

                if (existingProducts >= 0) {
                    updatedCart[existingProducts].quantity += quantity;
                } else {
                    updatedCart.push({ id: productId, quantity });
                }
                syncCart(updatedCart);
                return updatedCart;
            });
        }
    };

    const removeFromCart = (productId: number) => {
        setProductsInCart((prev) => {
            const updatedCart = prev.filter((p) => p.id !== productId);
            syncCart(updatedCart);
            return updatedCart;
        });
    };

    const updateQuantity = (productId: number, quantity: number) => {
        setProductsInCart((prev) => {
            const updatedCart = prev.map((p) =>
                p.id === productId ? { ...p, quantity } : p
            );
            syncCart(updatedCart);
            return updatedCart;
        })
    };

    const clearCart = () => {
        setProductsInCart([]);
        syncCart([]);
    }

    return (
        <CartContext.Provider value={{ productsInCart, addToCart, removeFromCart, updateQuantity, clearCart }}>
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
