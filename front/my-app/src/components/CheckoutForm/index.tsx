import { InputMask } from "@react-input/mask";
import { CheckoutFormProps } from "../Order/types";
import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { set } from "zod";

export default function CheckoutForm({
    onBackToForm,
    onSubmitOrder,
}: CheckoutFormProps) {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }
        setIsProcessing(true);
        setErrorMessage("");

        const cardElement = elements.getElement(CardElement);
        if (!cardElement) return;
        
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            card: cardElement,
            type: "card"
        });

        if (error) {
            console.error(error);
            setErrorMessage(error.message ?? "An error occurred");
            setIsProcessing(false);
        } else {
            onSubmitOrder({ paymentMethodId: paymentMethod.id });
        }
    };

    return (
        <div className="p-4 h-full w-full overflow-y-auto max-h-screen">
            <form className="flex flex-col gap-6 p-4" onSubmit={handleSubmit}>
                <h2 className="text-xl font-semibold text-gray-700 mb-6">Checkout</h2>

                <div>
                    <label
                        htmlFor="card-element"
                        className="block text-base font-normal text-gray-700 mb-3"
                    >
                        Card Details
                    </label>
                    <CardElement
                    id="card-element"
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
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                    />                    
                </div>
                {errorMessage && (
                    <div className="text-red-500 text-sm">{errorMessage}</div>
                )}

                <div className="flex justify-between mt-6">
                    <button
                        type="button"
                        onClick={onBackToForm}
                        className="
                            bg-transparent 
                            text-gray-500
                            hover:text-gray-600 
                            hover:duration-200 ease-in-out
                            font-semibold 
                            rounded-lg 
                            py-3 
                            px-6 
                        "
                        disabled={isProcessing}
                    >
                        Back
                    </button>
                    <button
                        type="submit"
                        disabled={!stripe || isProcessing}
                        className="
                            bg-cyan-700 
                            text-white
                            hover:bg-cyan-600
                            hover:duration-200 ease-in-out
                            font-semibold 
                            rounded-lg 
                            py-2
                            px-3 
                        "
                    >
                        {isProcessing ? "Processing..." : "Submit Order"}
                    </button>
                </div>
            </form>
        </div>
    );
}