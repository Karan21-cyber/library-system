"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = __importDefault(require("../utils/HttpException"));
const errorMiddleware = (error, req, res) => {
    if (error instanceof HttpException_1.default) {
        return res.status(error.statusCode).json({
            success: false,
            message: error.message,
        });
    }
    return res.status(500).json({
        success: false,
        message: "Internal Server Error.",
    });
};
exports.default = errorMiddleware;
