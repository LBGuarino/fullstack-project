import LoginForm from "@/components/LoginForm";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-thin sm:text-3xl md:text-4xl mb-8">
        Sign in to your account
      </h1>

      <div className="w-full max-w-md mx-auto bg-white p-6 shadow-md rounded-md">
        <LoginForm />
      </div>
    </div>
  );
}
