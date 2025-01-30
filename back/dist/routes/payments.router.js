"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payment_controller_1 = require("../controllers/payment.controller");
const paymentsRouter = (0, express_1.Router)();
paymentsRouter.post("/create-payment-intent", payment_controller_1.createPaymentIntent);
exports.default = paymentsRouter;
