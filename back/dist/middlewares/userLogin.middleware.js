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
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = require("../services/user.service");
const validateLogin = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password)
        next({ message: "Missing fields", status: 400 });
    else
        next();
};
const validateUserExists = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    if (!(yield (0, user_service_1.checkUserExists)(email)))
        next({ message: "User does not exist", statusCode: 400 });
    else
        next();
});
exports.default = [validateLogin, validateUserExists];
