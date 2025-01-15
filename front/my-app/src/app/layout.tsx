import NavBar from "@/components/NavBar";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="h-screen flex flex-col overflow-x-hidden">
        <NavBar />

        <main className="flex-1 overflow-auto">{children}</main>
      </body>
    </html>
  );
}
