// components/Order.tsx
'use client';

import { useState, useEffect } from "react";
import OrderForm from "../OrderForm";
import CheckoutForm from "../CheckoutForm";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useStripe } from "@stripe/react-stripe-js";
import { OrderFormInputs, orderFormSchema } from "@/validations/orderFormSchema";
import { PaymentMethodData } from "./types";
import { CartItem } from "@/context/CartContext";
import { useAuth } from "@/context/usersContext";

export interface OrderProps {
    products: CartItem[]; // Lista de productos en el carrito
    totalAmount: number;  // Monto total del carrito en centavos
}

const Order: React.FC<OrderProps> = ({ products, totalAmount }) => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [orderData, setOrderData] = useState<OrderFormInputs | null>(null);
    const [paymentError, setPaymentError] = useState<string | null>(null);
    const [paymentSuccess, setPaymentSuccess] = useState<string | null>(null);
    const { user } = useAuth();
    const stripe = useStripe();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
        reset,
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

    const productsIds: number[] = products.map((product) => product.product.id);

    const handleSubmitOrder = async ({ paymentMethodId }: PaymentMethodData): Promise<void> => {
        if (!orderData || !stripe) return;

        try {
            // Crear PaymentIntent en el backend
            const response = await axios.post<{ client_secret: string; status: string; next_action?: any }>(
                "http://localhost:3001/payment/create-payment-intent",
                {
                    paymentMethodId,
                    amount: totalAmount * 100, // Stripe requiere el monto en centavos
                }
            );

            const { client_secret, status, next_action } = response.data;
            console.log("PaymentIntent created:", response.data);

            if (status === "requires_action" && next_action?.type === "use_stripe_sdk") {
            } else if (status === "requires_confirmation" || status === "succeeded") {
                setPaymentSuccess("Payment succeeded.");
                await axios.post("http://localhost:3001/orders", {
                    userId: user?.id,
                    paymentMethodId,
                    products: productsIds,
                    orderData,
                }, {
                    withCredentials: true,
                });
            } else {
                setPaymentError("An error occurred during payment confirmation2.");
            }
                    
        } catch (error: any) {
            setPaymentError(error.response?.data?.error?.message || "An error occurred during payment confirmation3.");
        }
    };

    const handleContinueToPayment: SubmitHandler<OrderFormInputs> = (data) => {
        setOrderData(data);
        setIsCheckout(true);
    };

    useEffect(() => {
        if (!isCheckout && orderData) {
            reset(orderData);
        }
    }, [isCheckout, orderData, reset]);

    return (
        <div className="relative overflow-hidden h-full w-full">
            {!isCheckout && (
                <OrderForm
                    register={register}
                    errors={errors}
                    watchPickupPoint={watch("pickupPoint") ?? null}
                    setValue={setValue}
                    onContinueToCheckout={handleSubmit(handleContinueToPayment)}
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
};

export default Order;
