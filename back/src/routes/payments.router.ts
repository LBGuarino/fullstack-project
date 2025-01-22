import { Router } from "express";
import { createPaymentIntent } from "../controllers/payment.controller";

const paymentsRouter = Router();

paymentsRouter.post("/create-payment-intent", createPaymentIntent);

export default paymentsRouter;