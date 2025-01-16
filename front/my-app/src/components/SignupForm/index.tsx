import Link from "next/link";

export default function SignupForm() {
  return (
    <form className="flex flex-col gap-8">
      <div>
        <label
          htmlFor="fullname"
          className="block text-base font-normal text-gray-700 mb-3"
        >
          Full Name
        </label>
        <input
          type="text"
          name="fullname"
          id="fullname"
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
      </div>

      <div>
        <label
          htmlFor="birthdate"
          className="block text-base font-normal text-gray-700 mb-3"
        >
          Birthdate
        </label>
        <input
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
      </div>

      <div>
        <label
          htmlFor="address"
          className="block text-base font-normal text-gray-700 mb-3"
        >
          Address
        </label>
        <input
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
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-base font-normal text-gray-700 mb-3"
        >
          Phone
        </label>
        <input
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
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-base font-normal text-gray-700 mb-3"
        >
          Email address
        </label>
        <input
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
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-base font-normal text-gray-700 mb-3"
        >
          Password
        </label>
        <input
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
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-base font-normal text-gray-700 mb-3"
        >
          Confirm Password
        </label>
        <input
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
  );
}
