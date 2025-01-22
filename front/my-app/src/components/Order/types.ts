import { CheckoutFormInputs } from "@/validations/checkoutFormSchema";
import { OrderFormInputs } from "@/validations/orderFormSchema";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";

export interface PaymentDetailsProps {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
}

export interface OrderDetailsProps {
    name: string;
    phone: string;
    address: string;
    email: string;
    pickupPoint: number | null;
    paymentDetails: PaymentDetailsProps;
}

export interface OrderFormProps {
    register: UseFormRegister<OrderFormInputs>;
    errors: FieldErrors<OrderFormInputs>;
    watchPickupPoint: number | null;
    setValue: UseFormSetValue<OrderFormInputs>;
    onContinueToCheckout: () => void;
}

export interface CheckoutFormProps {
    register: UseFormRegister<CheckoutFormInputs>;
    errors: FieldErrors<CheckoutFormInputs>;
    setValue: UseFormSetValue<CheckoutFormInputs>;
    onBackToForm: () => void;
    onSubmitOrder: () => void;
}