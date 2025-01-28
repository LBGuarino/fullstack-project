'use client';

import { useState, useEffect } from "react";
import OrderForm from "../OrderForm";
import CheckoutForm from "../CheckoutForm";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useStripe } from "@stripe/react-stripe-js";
import { OrderFormInputs, orderFormSchema } from "@/validations/orderFormSchema";
import { PaymentMethodData } from "./types";
import { CartItem, useCartContext } from "@/context/CartContext";
import { useAuth } from "@/context/usersContext";
export interface OrderProps {
    products: CartItem[];
    totalAmount: number;
}

const Order: React.FC<OrderProps> = ({ products, totalAmount }) => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [orderData, setOrderData] = useState<OrderFormInputs | null>(null);
    const [paymentError, setPaymentError] = useState<string | null>(null);
    const [paymentSuccess, setPaymentSuccess] = useState<string | null>(null);
    const { user } = useAuth();
    const { clearCart } = useCartContext();
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

    const productsWQuantity = products.map((cartItem) => ({ productId: cartItem.product.id, quantity: cartItem.quantity }));

    const handleSubmitOrder = async ({ paymentMethodId }: PaymentMethodData): Promise<void> => {
        if (!orderData || !stripe) return;

        try {
            const response = await axios.post<{ client_secret: string; status: string; next_action?: { type: string } }>(
                `${process.env.NEXT_PUBLIC_API_URL}/payment/create-payment-intent`,
                {
                    paymentMethodId,
                    amount: totalAmount * 100,
                }
            );

            const { status, next_action } = response.data;

            if (status === "requires_action" && next_action?.type === "use_stripe_sdk") {
            } else if (status === "requires_confirmation" || status === "succeeded") {
                await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
                    userId: user?.id,
                    paymentMethodId,
                    products: productsWQuantity,
                    orderData,
                }, {
                    withCredentials: true,
                });
                setPaymentSuccess("Payment succeeded.");
            } else {
                setPaymentError("An error occurred during payment confirmation2.");
            }

        } catch (error: unknown) {
            const axiosError = error as AxiosError;
            setPaymentError(axiosError.message ?? "An error occurred during payment confirmation.");
        }
    };

    const handleContinueToPayment: SubmitHandler<OrderFormInputs> = (data) => {
        setOrderData(data);
        setIsCheckout(true);
    };

    useEffect(() => {
    if (paymentSuccess) {
        const timer = setTimeout(async () => {
            await clearCart();
            window.location.href = "/confirmation_page";
        }, 3000);
        return () => clearTimeout(timer);
    }
    }, [paymentSuccess]);

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
                <div className="fixed top-4 right-4 bg-red-500 text-white p-4 rounded z-50">
                    {paymentError}
                </div>
            )}

            {paymentSuccess && (
                <div className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded z-50">
                    {paymentSuccess}
                </div>
            )}
        </div>
    );
};

export default Order;
