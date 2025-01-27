'use client'

import { DropdownMenuProps } from "@/components/DropdownMenu";
import NavBar from "@/components/NavBar";
import { CartProvider } from "@/context/CartContext"
import AuthProvider from "@/context/usersContext"

interface ProvidersProps {
    children: React.ReactNode;
    dropdownProps: DropdownMenuProps;
}

export default function Providers({ children, dropdownProps }: ProvidersProps) {
    return (
        <AuthProvider>
            <CartProvider>
                <NavBar dropdownProps={dropdownProps} />
                <main className="flex-1 overflow-auto">{children}</main>
            </CartProvider>
        </AuthProvider>
    )
}