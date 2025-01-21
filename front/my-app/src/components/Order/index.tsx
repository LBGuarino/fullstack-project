'use client';
import { useState } from "react";
import OrderForm from "../OrderForm";
import CheckoutForm from "../CheckoutForm";
import { useForm } from "react-hook-form";
import { OrderFormInputs, orderFormSchema } from "@/helpers/validations";
import { zodResolver } from "@hookform/resolvers/zod";


export default function Order() {
    const [isCheckout, setIsCheckout] = useState(false);
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<OrderFormInputs>({
        resolver: zodResolver(orderFormSchema),
        defaultValues: {
            name: "",
            phone: "",
            address: {
                street: "",
                city: "",
                postalCode: "",
                country: "",
            },
            email: "",
            pickupPoint: null,
            paymentDetails: {
                cardNumber: "",
                expiryDate: "",
                cvv: "",
        },
    },
});
    
    const watchPickupPoint = watch("pickupPoint") ?? null;

    const handleSubmitOrder = (data: OrderFormInputs) => {
        console.log(`order submitted: ${JSON.stringify(data)}`);
    };

    const handleContinueToPayment = handleSubmit(() => {
        setIsCheckout(true);
    })

    return (
        <div className="relative overflow-hidden h-full w-full">
            <div
                className={`absolute inset-0 w-full h-full transform transition-transform duration-500 ${
                    isCheckout ? "-translate-x-full" : "translate-x-0"
                }`}
            >
                <OrderForm
                    register={register}
                    errors={errors}
                    watchPickupPoint={watchPickupPoint}
                    setValue={setValue}
                    onContinueToCheckout={handleContinueToPayment}
                />
            </div>

            <div
                className={`absolute inset-0 w-full h-full transform transition-transform duration-500 ${
                    isCheckout ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <CheckoutForm
                    register={register}
                    errors={errors}
                    setValue={setValue}       
                    onBackToForm={() => setIsCheckout(false)}
                    onSubmitOrder={handleSubmit(handleSubmitOrder)}
                />
            </div>
        </div>
    );
}
