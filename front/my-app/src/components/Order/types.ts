import { OrderFormInputs } from "@/validations/orderFormSchema";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";

export interface PaymentMethodData {
    paymentMethodId: string;
}

export interface OrderDetailsProps {
    name: string;
    phone: string;
    address: string;
    email: string;
    pickupPoint: number | null;
    paymentMethoId: string;
}

export interface OrderFormProps {
    register: UseFormRegister<OrderFormInputs>;
    errors: FieldErrors<OrderFormInputs>;
    watchPickupPoint: number | null;
    setValue: UseFormSetValue<OrderFormInputs>;
    onContinueToCheckout: () => void;
}

export interface CheckoutFormProps {
    onBackToForm: () => void;
    onSubmitOrder: (data: PaymentMethodData) => Promise<void>;
}