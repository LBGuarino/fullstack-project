import Link from "next/link";

export default function ConfirmationPage() {  
  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row">
      <div className="flex-1 bg-gradient-to-br from-white to-cyan-50 flex flex-col items-center justify-center p-8">
        <h1 className="text-3xl md:text-4xl font-light text-center mb-4">
          Thank you for your order!
        </h1>
        <p className="text-base md:text-lg font-extralight text-center max-w-md leading-relaxed">
          Your order has been placed successfully.
          We will send you an email with your order details.
        </p>

        <Link href="/my-orders" className="bg-cyan-600 text-white hover:bg-cyan-700 transition-colors duration-200 font-semibold rounded-lg py-1 px-4 mt-8">
            Go to my orders
        </Link>
      </div>
    </div>
  );
}
