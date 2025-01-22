import { InputMask } from "@react-input/mask";
import { CheckoutFormProps } from "../Order/types";

export default function CheckoutForm({
    register,
    errors,
    onBackToForm,
    onSubmitOrder,
}: CheckoutFormProps) {

    return (
        <div className="p-4 h-full w-full overflow-y-auto max-h-screen">
            <form className="flex flex-col gap-6 p-4" onSubmit={onSubmitOrder}>
                <h2 className="text-xl font-semibold text-gray-700 mb-6">Checkout</h2>

                <div>
                    <label
                        htmlFor="card-number"
                        className="block text-base font-normal text-gray-700 mb-3"
                    >
                        Card Number
                    </label>
                    <InputMask
                        mask="____ ____ ____ ____"
                        replacement={{ _: /\d/ }}
                        {...register("paymentDetails.cardNumber")}
                        type="text"
                        name="paymentDetails.cardNumber"
                        id="card-number"
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
                    {errors.paymentDetails?.cardNumber && (
                        <p className="text-red-500 text-sm">{errors.paymentDetails.cardNumber.message}</p>
                    )}
                </div>

                <div>
                    <label
                        htmlFor="expiry"
                        className="block text-base font-normal text-gray-700 mb-3"
                    >
                        Expiry Date
                    </label>
                    <InputMask
                        mask="__/__"
                        replacement={{ _: /\d/ }}
                        {...register("paymentDetails.expiryDate")}
                        type="text"
                        name="paymentDetails.expiryDate"
                        id="expiry"
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
                    {errors.paymentDetails?.expiryDate && (
                        <p className="text-red-500 text-sm">{errors.paymentDetails.expiryDate.message}</p>
                    )}
                </div>

                <div>
                    <label
                        htmlFor="cvv"
                        className="block text-base font-normal text-gray-700 mb-3"
                    >
                        CVV
                    </label>
                    <InputMask
                        mask="___"
                        replacement={{ _: /\d/ }}
                        {...register("paymentDetails.cvv")}
                        type="text"
                        name="paymentDetails.cvv"
                        id="cvv"
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
                    {errors.paymentDetails?.cvv && (
                        <p className="text-red-500 text-sm">{errors.paymentDetails.cvv.message}</p>
                    )}
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
                        Submit Order
                    </button>
                </div>
            </form>
        </div>
    );
}