// components/Order.js
'use client';
import { useState, useEffect } from "react";
import OrderForm from "../OrderForm";
import CheckoutForm from "../CheckoutForm";
import { useForm } from "react-hook-form";
import { orderFormSchema } from "@/validations/orderFormSchema";
import { checkoutFormSchema } from "@/validations/checkoutFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { OrderFormInputs } from "@/validations/orderFormSchema";
import { CheckoutFormInputs } from "@/validations/checkoutFormSchema";

export default function Order() {
    const [isCheckout, setIsCheckout] = useState(false);
    const [orderData, setOrderData] = useState<OrderFormInputs | null>(null);

    const {
        register: registerOrderForm,
        handleSubmit: handleSubmitOrderForm,
        setValue: setValueOrderForm,
        watch: watchOrderForm,
        formState: { errors: errorsOrderForm },
        reset: resetOrderForm,
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
        },
        shouldUnregister: true,
    });

    const {
        register: registerCheckoutForm,
        handleSubmit: handleSubmitCheckoutForm,
        setValue: setValueCheckoutForm,
        watch: watchCheckoutForm,
        formState: { errors: errorsCheckoutForm },
        reset: resetCheckoutForm, 
    } = useForm<CheckoutFormInputs>({
        resolver: zodResolver(checkoutFormSchema),
        defaultValues: {
            paymentDetails: {
                cardNumber: "",
                expiryDate: "",
                cvv: "",
            },
        },
        shouldUnregister: true,
    });

    const handleSubmitOrder = (checkoutData: CheckoutFormInputs) => {
        if (orderData) {
            const completeOrder = { ...orderData, ...checkoutData };
            console.log(`Order submitted: ${JSON.stringify(completeOrder)}`);
            // Aquí puedes enviar completeOrder al backend
        }
    };

    const handleContinueToPayment = (data: OrderFormInputs) => {
        setOrderData(data); 
        setIsCheckout(true); 
    };

    useEffect(() => {
        if (!isCheckout && orderData) {
            resetOrderForm(orderData);
        }
    }, [isCheckout, orderData, resetOrderForm]);

    return (
        <div className="relative overflow-hidden h-full w-full">
            {!isCheckout && (
                <OrderForm
                    register={registerOrderForm}
                    errors={errorsOrderForm}
                    watchPickupPoint={watchOrderForm("pickupPoint") ?? null}
                    setValue={setValueOrderForm}
                    onContinueToCheckout={handleSubmitOrderForm(handleContinueToPayment)}
                />
            )}

            {isCheckout && (
                <CheckoutForm
                    register={registerCheckoutForm}
                    errors={errorsCheckoutForm}
                    setValue={setValueCheckoutForm}       
                    onBackToForm={() => setIsCheckout(false)}
                    onSubmitOrder={handleSubmitCheckoutForm(handleSubmitOrder)}
                />
            )}
        </div>    
    );
}
