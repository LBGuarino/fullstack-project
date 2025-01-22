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
import axios from "axios";
import { useStripe } from "@stripe/react-stripe-js";
import { PaymentMethodData } from "./types";
import { CartItem } from "@/context/CartContext";

export interface CartProduct {
    productId: number;
    quantity: number;
    price: number;
}

export default function Order({
    products,
    totalAmount,
}: {
    products: CartItem[];
    totalAmount: number;
}) {
    const [isCheckout, setIsCheckout] = useState(false);
    const [orderData, setOrderData] = useState<OrderFormInputs | null>(null);
    const [paymentError, setPaymentError] = useState<string | null>(null);
    const [paymentSuccess, setPaymentSuccess] = useState<string | null>(null);
    const stripe = useStripe();

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

    const handleSubmitOrder = async (checkoutData: PaymentMethodData) => {
        if (orderData && stripe) {
            const amount = totalAmount * 100;

            try {
                // Crea el PaymentIntent en el backend
                const response = await axios.post('http://localhost:3001/payment/create-payment-intent', {
                    paymentMethodId: checkoutData.paymentMethodId,
                    amount: amount,
                });

                const paymentIntent = response.data;

                if (paymentIntent.status === 'requires_action' && paymentIntent.next_action.type === 'use_stripe_sdk') {
                    // Maneja la autenticación adicional (p.ej., 3D Secure)
                    const { error: stripeError, paymentIntent: updatedPaymentIntent } = await stripe.confirmCardPayment(paymentIntent.client_secret);

                    if (stripeError) {
                        setPaymentError(stripeError.message?? 'An error occurred');
                    } else if (updatedPaymentIntent.status === 'succeeded') {
                        setPaymentSuccess('Pago realizado con éxito');
                        // Aquí puedes almacenar la orden en tu base de datos
                        // y redirigir al usuario a una página de éxito
                    }
                } else if (paymentIntent.status === 'succeeded') {
                    setPaymentSuccess('Pago realizado con éxito');
                    // Aquí puedes almacenar la orden en tu base de datos
                    // y redirigir al usuario a una página de éxito
                }
            } catch (error: any) {
                setPaymentError(error.response?.data?.error?.message || 'An unexpected error occurred');
            }
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
                    onBackToForm={() => setIsCheckout(false)}
                    onSubmitOrder={handleSubmitOrder}
                />
            )}
            
            {paymentError && (
                <div className="fixed top-4 right-4 bg-red-500 text-white p-4 rounded">
                    {paymentError}
                </div>
            )}

            {paymentSuccess && (
                <div className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded">
                    {paymentSuccess}
                </div>
            )}
        </div>    
    );
}
