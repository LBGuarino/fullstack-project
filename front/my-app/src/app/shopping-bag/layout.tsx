import AuthProvider from "@/context/usersContext";

export default function ShoppingBagLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="flex w-full h-screen">
                {children}
            </div>
        </>
    );
};