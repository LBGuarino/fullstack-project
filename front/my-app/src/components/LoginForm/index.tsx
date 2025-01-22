'use client'
import { useAuth } from "@/context/usersContext";
import { LoginFormInputs, loginSchema } from "@/validations/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const { login } = useAuth();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess('');
        window.location.href = '/';
     }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);


  const onSubmit = async (data: LoginFormInputs) => {
    try {
      await login(data);
      setSuccess('Login successful');
    } catch (err) {
      if (err instanceof AxiosError) {
        const errMessage =
          err.response?.data?.message || err.message || 'Unexpected error';
        setError(errMessage);
      } else {
        setError('An unknown error occurred');
      }
    }
  }
    return (
      <>
      {error && (
        <div
          className="
            fixed top-0 left-0 w-full h-full 
            bg-black bg-opacity-50 
            backdrop-blur-sm
            flex items-center 
            justify-center
            z-50
          "
        >
          <div
            className="
              relative
              bg-red-50 
              border-l-4 
              border-red-600 
              text-red-700 
              px-6 
              py-4 
              rounded-md 
              max-w-md 
              w-full 
              mx-4 
              shadow-md
            "
          >
            <button
              onClick={() => setError('')}
              className="
                absolute 
                top-2 
                right-2
                text-red-600
                hover:text-red-800
                transition
              "
            >
              &times;
            </button>
            <div className="flex items-center mb-2">
              <h2 className="font-bold text-red-700">Error!</h2>
            </div>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      )}

      {success && (
        <div
          className="
            fixed top-0 left-0 w-full h-full 
            bg-black bg-opacity-50 
            backdrop-blur-sm
            flex items-center 
            justify-center
            z-50
          "
        >
          <div
            className="
              relative
              bg-green-50 
              border-l-4 
              border-green-600 
              text-green-700 
              px-6 
              py-4 
              rounded-md 
              max-w-md 
              w-full 
              mx-4 
              shadow-md
            "
          >
            <button
              onClick={() => setSuccess('')}
              className="
                absolute 
                top-2 
                right-2
                text-green-600
                hover:text-green-800
                transition
              "
            >
              &times;
            </button>
            <div className="flex items-center mb-2">
              <h2 className="font-bold text-green-700">Success!</h2>
            </div>
            <p className="text-sm">{success}</p>
          </div>
        </div>
      )}

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
            autoComplete="new-password"
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
      </>
    );
  }
  