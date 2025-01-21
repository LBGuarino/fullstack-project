import { OrderFormInputs } from "@/helpers/validations";
import { FieldErrors, UseFormRegister, UseFormSetError, UseFormSetValue } from "react-hook-form";

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
    register: UseFormRegister<OrderFormInputs>;
    errors: FieldErrors<OrderFormInputs>;
    setValue: UseFormSetValue<OrderFormInputs>;
    onBackToForm: () => void;
    onSubmitOrder: () => void;
}