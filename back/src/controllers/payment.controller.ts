import { Request, Response } from "express";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-12-18.acacia",
}); 

export const createPaymentIntent = async (req: Request, res: Response) => {
    const { paymentMethodId, amount } = req.body;

    if (!paymentMethodId || !amount) {
        return res.status(400).json({ error: { message: 'Missing paymentMethodId or amount.' } });
      }

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: "eur",
            payment_method: paymentMethodId,
            automatic_payment_methods: {
                enabled: true,
                allow_redirects: "never",
            },
        });

        res.status(200).json(paymentIntent);
    } catch (error: any) {
        res.status(500).json({ error: { message: error.message } });
    }
};