'use client'
import loginUser from "@/helpers/loginUser";
import { LoginFormInputs, loginSchema } from "@/helpers/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormInputs) => {
    loginUser(data);
  }
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
        <div>
          <label
            htmlFor="email"
            className="block text-base font-normal text-gray-700 mb-3"
          >
            Email address
          </label>
          <input
            {...register('email')}
            type="email"
            name="email"
            id="email"
            className="
            w-full 
            rounded-lg
            border-0      
            border-b            
            border-gray-300   
            bg-transparent      
            focus:border-cyan-700
            focus:ring-0         
            placeholder-gray-400  
            text-sm            
            py-2              
            "
            placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">
                {errors.email.message}
              </p>
            )}
        </div>
  
        <div>
          <label
            htmlFor="password"
            className="block text-base font-normal text-gray-700 mb-3"
          >
            Password
          </label>
          <input
            {...register('password')}
            type="password"
            name="password"
            id="password"
            className="
            w-full 
            rounded-lg
            border-0      
            border-b            
            border-gray-300   
            bg-transparent      
            focus:border-cyan-700
            focus:ring-0         
            placeholder-gray-400  
            text-sm            
            py-2              
            "
            placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">
                {errors.password.message}
              </p>
            )}            
          <Link href="/forgot-password" className="text-sm text-gray-500 hover:text-gray-700">
              Forgot your password?
          </Link>
        </div>
  
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent
                       rounded-full shadow-sm text-sm font-medium text-white
                       bg-cyan-700 hover:bg-cyan-800 focus:outline-none
                       transition duration-150 ease-in-out"
          >
            Sign in
          </button>
        </div>
        <div className="flex justify-center">
          <Link href='/signup' className="text-sm text-gray-600 hover:text-gray-700 border-b-2 border-gray-500 hover:border-gray-700">
            Create an account
          </Link>
        </div>
      </form>
    );
  }
  