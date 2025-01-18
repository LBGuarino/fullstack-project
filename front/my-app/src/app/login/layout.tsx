import AuthProvider from "@/context/usersContext";

export default function LoginLayout({ 
    children 
}: { children: React.ReactNode }) 
{
    return (
        <>
        <AuthProvider>
            <div className="flex flex-col items-center justify-center h-screen">
                {children}
            </div>
        </AuthProvider>
        </>
    );
};