'use client';
import { useState } from "react";
import { OrderDetailsProps } from "./types";
import OrderForm from "../OrderForm";
import CheckoutForm from "../CheckoutForm";

export default function Order() {
    const [isCheckout, setIsCheckout] = useState(false);
    const [orderDetails, setOrderDetails] = useState<OrderDetailsProps>({
        name: "",
        phone: "",
        address: "",
        email: "",
        pickupPoint: null,
        paymentDetails: {
            cardNumber: "",
            expiryDate: "",
            cvv: "",
        },
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setOrderDetails((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handlePaymentDetailsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setOrderDetails((prev) => ({
            ...prev,
            paymentDetails: {
                ...prev.paymentDetails,
                [name]: value,
            },
        }));
    };

    const handleSubmitOrder = () => {
        console.log("Order submitted:", orderDetails);
    };

    return (
        <div className="relative overflow-hidden h-full w-full">
            <div
                className={`absolute inset-0 w-full h-full transform transition-transform duration-500 ${
                    isCheckout ? "-translate-x-full" : "translate-x-0"
                }`}
            >
                <OrderForm
                    orderDetails={orderDetails}
                    onInputChange={handleInputChange}
                    onContinueToCheckout={() => setIsCheckout(true)}
                />
            </div>

            <div
                className={`absolute inset-0 w-full h-full transform transition-transform duration-500 ${
                    isCheckout ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <CheckoutForm
                    paymentDetails={orderDetails.paymentDetails}
                    onPaymentDetailsChange={handlePaymentDetailsChange}
                    onBackToForm={() => setIsCheckout(false)}
                    onSubmitOrder={handleSubmitOrder}
                />
            </div>
        </div>
    );
}
