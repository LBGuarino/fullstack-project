import AuthProvider from "@/context/usersContext";

export default function ConfirmationPageLayout({ children }: { children: React.ReactNode }) {
    return (
    <AuthProvider>
        {children}
    </AuthProvider>
    );
}