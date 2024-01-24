"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const book_controller_1 = __importDefault(require("../controllers/book.controller"));
const router = (0, express_1.Router)();
router.get("/v1/library/book", book_controller_1.default.getAllBooks);
router.get("/v1/library/book/:id", book_controller_1.default.getSingleBook);
router.post("/v1/library/book/search", book_controller_1.default.getBookBySearch);
router.post("/v1/library/book", book_controller_1.default.createNewBook);
router.put("/v1/library/book/:id", book_controller_1.default.updateBook);
router.delete("/v1/library/book/:id", book_controller_1.default.deleteBook);
const bookRouter = router;
exports.default = bookRouter;
