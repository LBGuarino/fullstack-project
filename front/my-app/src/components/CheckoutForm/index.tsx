import { CheckoutFormProps } from "../Order/types";

export default function CheckoutForm({
    paymentDetails,
    onPaymentDetailsChange,
    onBackToForm,
    onSubmitOrder,
} : CheckoutFormProps) {
    return (
        <div className="p-4 h-full w-full overflow-y-auto max-h-screen">
            <form className="flex flex-col gap-6 p-4">
                <h2 className="text-xl font-semibold text-gray-700 mb-6">Checkout</h2>

                <div>
                    <label
                        htmlFor="card-number"
                        className="block text-base font-normal text-gray-700 mb-3"
                    >
                        Card Number
                    </label>
                    <input
                        type="text"
                        name="card-number"
                        id="card-number"
                        value={paymentDetails.cardNumber}
                        onChange={onPaymentDetailsChange}
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
                        placeholder="1234 5678 9012 3456"
                    />
                </div>

                <div>
                    <label
                        htmlFor="expiry"
                        className="block text-base font-normal text-gray-700 mb-3"
                    >
                        Expiry Date
                    </label>
                    <input
                        type="text"
                        name="expiry"
                        id="expiry"
                        value={paymentDetails.expiryDate}
                        onChange={onPaymentDetailsChange}
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
                        placeholder="MM/YY"
                    />
                </div>

                <div>
                    <label
                        htmlFor="cvv"
                        className="block text-base font-normal text-gray-700 mb-3"
                    >
                        CVV
                    </label>
                    <input
                        type="text"
                        name="cvv"
                        id="cvv"
                        value={paymentDetails.cvv}
                        onChange={onPaymentDetailsChange}
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
                        placeholder="123"
                    />
                </div>

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
                    >
                        Back
                    </button>
                    <button
                        type="submit"
                        onClick={onSubmitOrder}
                        className="
                            bg-cyan-700 
                            text-white
                            hover:bg-cyan-600
                            hover:duration-200 ease-in-out
                            font-semibold 
                            rounded-lg 
                            py-3 
                            px-6 
                        "
                    >
                        Submit Order
                    </button>
                </div>
            </form>
        </div>
    );
}
