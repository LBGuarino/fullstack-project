import NavBar from "@/components/NavBar";
import "./globals.css";
import { fetchDropdownData } from "@/helpers/fetchData";
import AuthProvider from "@/context/usersContext";
import { CartProvider } from "@/context/CartContext";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const dropdownProps = await fetchDropdownData();

  return (
    <html lang="en">
      <CartProvider>

      <body className="h-screen flex flex-col overflow-x-hidden">
      <AuthProvider>
        <NavBar dropdownProps={dropdownProps} />
      </AuthProvider>

        <main className="flex-1 overflow-auto">{children}</main>
      </body>
      </CartProvider>
    </html>
  );
}
