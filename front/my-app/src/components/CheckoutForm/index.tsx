'use client';

import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { CheckoutFormProps } from "../Order/types";
import { AxiosError } from "axios";

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onBackToForm, onSubmitOrder }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsProcessing(true);
        setErrorMessage("");

        if (!stripe || !elements) {
            setErrorMessage("Stripe is not ready yet.");
            setIsProcessing(false);
            return;
        }

        const cardElement = elements.getElement(CardElement);
        if (!cardElement) {
            setErrorMessage("Card Element not found.");
            setIsProcessing(false);
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: cardElement,
        });

        if (error) {
            setErrorMessage(error.message ?? "Error while processing payment.");
            setIsProcessing(false);
            return;
        }

        try {
            await onSubmitOrder({ paymentMethodId: paymentMethod!.id });
        } catch (error: unknown) {
            const axiosError = error as AxiosError;
            setErrorMessage(axiosError.message ?? "Error while processing payment.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="p-4 h-full w-full overflow-y-auto max-h-screen">
            <form className="flex flex-col gap-6 p-4" onSubmit={handleSubmit}>
                <h2 className="text-xl font-semibold text-gray-700 mb-6">Payment Info</h2>

                <div>
                    <label
                        htmlFor="card-element"
                        className="block text-base font-normal text-gray-700 mb-3"
                    >
                        Card Details
                    </label>
                    <CardElement
                        id="card-element"
                        options={{
                            style: {
                                base: {
                                    fontSize: "16px",
                                    color: "#424770",
                                    "::placeholder": {
                                        color: "#aab7c4",
                                    },
                                },
                                invalid: {
                                    color: "#9e2146",
                                },
                            },
                        }}
                        className="w-full border-b border-gray-300 bg-transparent text-sm py-2"
                    />
                </div>

                {errorMessage && <div className="text-red-500 text-sm">{errorMessage}</div>}

                <div className="flex justify-between mt-6">
                    <button
                        type="button"
                        onClick={onBackToForm}
                        className="bg-transparent text-gray-500 hover:text-gray-600 font-semibold rounded-lg py-3 px-6"
                        disabled={isProcessing}
                    >
                        Back
                    </button>
                    <button
                        type="submit"
                        disabled={!stripe || isProcessing}
                        className="bg-cyan-700 text-white hover:bg-cyan-600 font-semibold rounded-lg py-2 px-3"
                    >
                        {isProcessing ? "Processing..." : "Submit Order"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CheckoutForm;
