import AnimatedPage from "@/components/AnimatedPage";

export default function ConfirmationPageLayout({ children }: { children: React.ReactNode }) {
    return (
    <AnimatedPage>
        {children}
    </AnimatedPage>
    );
}