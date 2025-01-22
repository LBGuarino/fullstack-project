import { z } from "zod"

export const checkoutFormSchema = z.object({
    paymentDetails: z.object({
        cardNumber: z.preprocess(
        (val) => (typeof val === "string" ? val.replace(/\s+/g, "") : val),
        z
            .string()
            .nonempty("Card number is required.")
            .regex(/^\d{16}$/, "Card number must be 16 digits.")
        ),
        expiryDate: z.preprocess(
        (val) => (typeof val === "string" ? val.trim() : val),
        z
            .string()
            .nonempty("Card expiry is required.")
            .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry date must be in MM/YY format.")
        ),
        cvv: z.preprocess(
        (val) => (typeof val === "string" ? val.trim() : val),
        z
            .string()
            .nonempty("Card CVV is required.")
            .regex(/^\d{3,4}$/, "CVV must be 3 or 4 digits.")
        ),
    }),
});

export type CheckoutFormInputs = z.infer<typeof checkoutFormSchema>;
