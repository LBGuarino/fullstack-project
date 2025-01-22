'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

import { SignupFormInputs, signupSchema } from '@/validations/validations';
import registerUser from '@/helpers/registerUser';

export default function SignupForm() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>({
    resolver: zodResolver(signupSchema),
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
        window.location.href = '/login';
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const onSubmit = async (data: SignupFormInputs) => {
    try {
      await registerUser(data);
      setSuccess('Registration successful');
    } catch (err) {
      if (err instanceof AxiosError) {
        const errMessage =
          err.response?.data?.message || err.message || 'Unexpected error';
        setError(errMessage);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

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
            htmlFor="name"
            className="block text-base font-normal text-gray-700 mb-3"
          >
            Full Name
          </label>
          <input
            {...register('name')}
            type="text"
            name="name"
            id="name"
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
            placeholder="John Doe"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="birthdate"
            className="block text-base font-normal text-gray-700 mb-3"
          >
            Birthdate
          </label>
          <input
            {...register('birthdate')}
            type="date"
            name="birthdate"
            id="birthdate"
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
            placeholder="mm/dd/yyyy"
          />
          {errors.birthdate && (
            <p className="text-red-500 text-sm">{errors.birthdate.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="address"
            className="block text-base font-normal text-gray-700 mb-3"
          >
            Address
          </label>
          <input
            {...register('address')}
            type="text"
            name="address"
            id="address"
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
            placeholder="1234 Main St"
          />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-base font-normal text-gray-700 mb-3"
          >
            Phone
          </label>
          <input
            {...register('phone')}
            type="tel"
            name="phone"
            id="phone"
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
            placeholder="(555) 123-4567"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}
        </div>

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
            <p className="text-red-500 text-sm">{errors.email.message}</p>
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
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-base font-normal text-gray-700 mb-3"
          >
            Confirm Password
          </label>
          <input
            {...register('confirmPassword')}
            type="password"
            name="confirmPassword"
            id="confirmPassword"
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
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div>
          <button
            type="submit"
            className="
              w-full 
              flex 
              justify-center 
              py-2 
              px-4 
              border 
              border-transparent
              rounded-full 
              shadow-sm 
              text-sm 
              font-medium 
              text-white
              bg-cyan-700 
              hover:bg-cyan-800 
              focus:outline-none
              transition 
              duration-150 
              ease-in-out
            "
          >
            Sign up
          </button>
        </div>
      </form>
    </>
  );
}
