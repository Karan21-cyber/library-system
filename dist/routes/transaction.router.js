"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transaction_controller_1 = __importDefault(require("../controllers/transaction.controller"));
const router = (0, express_1.Router)();
router.post("/v1/library/transaction", transaction_controller_1.default.createNewTransaction);
router.get("/v1/library/transaction", transaction_controller_1.default.getallTransaction);
router.get("/v1/library/transaction/:id", transaction_controller_1.default.singleTransaction);
router.get("/v1/library/transaction/member/:id", transaction_controller_1.default.getTransactionByMemberId);
router.get("/v1/library/transaction/book/:id", transaction_controller_1.default.getTransactionByBookId);
router.get("/v1/library/transaction/status/:status", transaction_controller_1.default.getTransactionByStatus);
router.put("/v1/library/transaction/:id", transaction_controller_1.default.updateTransaction);
router.delete("/v1/library/transaction/:id", transaction_controller_1.default.deleteTransaction);
const transactionRouter = router;
exports.default = transactionRouter;
