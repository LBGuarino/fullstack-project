import AnimatedPage from "@/components/AnimatedPage";
import AuthProvider from "@/context/usersContext";

export default function ConfirmationPageLayout({ children }: { children: React.ReactNode }) {
    return (
    <AuthProvider>
    <AnimatedPage>
        {children}
    </AnimatedPage>
    </AuthProvider>
    );
}