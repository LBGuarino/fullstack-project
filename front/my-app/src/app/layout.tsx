import NavBar from "@/components/NavBar";
import "./globals.css";
import { fetchDropdownData } from "@/helpers/fetchData";
import AuthProvider from "@/context/usersContext";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const dropdownProps = await fetchDropdownData();

  return (
    <html lang="en">
      <body className="h-screen flex flex-col overflow-x-hidden">
      <AuthProvider>
        <NavBar dropdownProps={dropdownProps} />
      </AuthProvider>

        <main className="flex-1 overflow-auto">{children}</main>
      </body>
    </html>
  );
}
