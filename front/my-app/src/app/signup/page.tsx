import SignupForm from "@/components/SignupForm";

export default function Signup() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-thin sm:text-3xl md:text-4xl mb-8 mt-8">
        Sign up to hi-tec
      </h1>

      <div className="w-full max-w-md mx-auto bg-white p-6 shadow-md rounded-md">
        <SignupForm />
      </div>
    </div>
  );
}
