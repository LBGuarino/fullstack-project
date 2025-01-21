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
    orderDetails: OrderDetailsProps;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onContinueToCheckout: () => void;
}

export interface CheckoutFormProps {
    paymentDetails: PaymentDetailsProps;
    onPaymentDetailsChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBackToForm: () => void;
    onSubmitOrder: () => void;
}