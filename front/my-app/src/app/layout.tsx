import "./globals.css";
import { fetchDropdownData } from "@/helpers/fetchData";
import Providers from "./providers";
import { Footer } from "@/components/Footer";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const dropdownProps = await fetchDropdownData();

  return (
    <html lang="en">
      <body className="h-screen flex flex-col overflow-x-hidden">
        <Providers dropdownProps={dropdownProps}>
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
