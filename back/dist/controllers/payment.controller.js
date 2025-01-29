"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPaymentIntent = void 0;
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-12-18.acacia",
});
const createPaymentIntent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { paymentMethodId, amount } = req.body;
    if (!paymentMethodId || !amount) {
        return res.status(400).json({ error: { message: 'Missing paymentMethodId or amount.' } });
    }
    try {
        const paymentIntent = yield stripe.paymentIntents.create({
            amount: amount,
            currency: "eur",
            payment_method: paymentMethodId,
            automatic_payment_methods: {
                enabled: true,
                allow_redirects: "never",
            },
            confirm: true,
        });
        res.status(200).json(paymentIntent);
    }
    catch (error) {
        res.status(500).json({ error: { message: error.message } });
    }
});
exports.createPaymentIntent = createPaymentIntent;
