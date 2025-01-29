"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use((0, cookie_parser_1.default)());
app.use(routes_1.default);
app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).send({
        statusCode: err.statusCode || 500,
        message: err.message || "Internal Server Error",
    });
});
exports.default = app;
