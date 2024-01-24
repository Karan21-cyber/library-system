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
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const prisma_1 = __importDefault(require("../prisma"));
const HttpException_1 = __importDefault(require("../utils/HttpException"));
// create new transaction
const createNewTransaction = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.body;
    //fetching the book through book id
    const book = yield prisma_1.default.books.findUnique({
        where: {
            id: bookId,
        },
    });
    // checking the book
    if (!book) {
        throw new HttpException_1.default("Book not found.", 400);
    }
    if ((book === null || book === void 0 ? void 0 : book.quantity) == 0) {
        throw new HttpException_1.default("Book is not available.", 400);
    }
    const count = (book === null || book === void 0 ? void 0 : book.quantity) - 1;
    // update the book
    yield prisma_1.default.books.update({
        where: {
            id: bookId,
        },
        data: {
            quantity: count,
        },
    });
    const newTransaction = yield prisma_1.default.transaction.create({
        data: Object.assign(Object.assign({}, req.body), { borrowDate: req.body.borrowDate }),
    });
    const findreport = yield prisma_1.default.report.findUnique({
        where: {
            bookId: bookId,
        },
    });
    if (findreport) {
        yield prisma_1.default.report.update({
            where: {
                bookId: bookId,
            },
            data: {
                memberborrows: findreport.memberborrows + 1,
            },
        });
    }
    else {
        yield prisma_1.default.report.create({
            data: {
                bookId: bookId,
                memberborrows: 1,
            },
        });
    }
    return res.status(201).json({
        success: true,
        message: "Transaction Created Successfully.",
        data: newTransaction,
    });
}));
const updateTransaction = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const resBody = req.body;
    const result = yield prisma_1.default.transaction.update({
        where: { id: id },
        data: Object.assign(Object.assign({}, resBody), { returnDate: resBody.returnDate, status: resBody.status }),
    });
    const book = yield prisma_1.default.books.findUnique({
        where: {
            id: result.bookId,
        },
    });
    if (book) {
        if (result.status === "returned") {
            const count = (book === null || book === void 0 ? void 0 : book.quantity) + 1;
            yield prisma_1.default.books.update({
                where: {
                    id: book.id,
                },
                data: {
                    quantity: count,
                },
            });
        }
    }
    return res.status(200).json({
        success: true,
        message: "Transaction Updated Successfully.",
        data: yield prisma_1.default.transaction.findUnique({
            where: { id: id },
            select: {
                id: true,
                bookId: true,
                memberId: true,
                borrowDate: true,
                returnDate: true,
                status: true,
                Member: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                Book: {
                    select: {
                        id: true,
                        title: true,
                        ISBN: true,
                    },
                },
            },
        }),
    });
}));
const getallTransaction = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const transactions = yield prisma_1.default.transaction.findMany({
        orderBy: {
            createdAt: "desc",
        },
        select: {
            id: true,
            bookId: true,
            memberId: true,
            borrowDate: true,
            returnDate: true,
            status: true,
            Member: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
            Book: {
                select: {
                    id: true,
                    title: true,
                    ISBN: true,
                },
            },
        },
    });
    return res.status(200).json({
        success: true,
        message: "Data Fetched Successfully.",
        data: transactions,
    });
}));
const singleTransaction = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const singleTransaction = yield prisma_1.default.transaction.findUnique({
        where: { id: id },
        select: {
            id: true,
            bookId: true,
            memberId: true,
            borrowDate: true,
            returnDate: true,
            status: true,
            Member: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
            Book: {
                select: {
                    id: true,
                    title: true,
                    ISBN: true,
                },
            },
        },
    });
    return res.status(200).json({
        success: true,
        message: "Single Data Fetched Successfully.",
        data: singleTransaction,
    });
}));
const getTransactionByBookId = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const transactions = yield prisma_1.default.transaction.findMany({
        where: {
            bookId: id,
        },
        orderBy: {
            createdAt: "desc",
        },
        select: {
            id: true,
            bookId: true,
            memberId: true,
            borrowDate: true,
            returnDate: true,
            status: true,
            Member: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
            Book: {
                select: {
                    id: true,
                    title: true,
                    ISBN: true,
                },
            },
        },
    });
    return res.status(200).json({
        success: true,
        message: "Data Fetched Successfully.",
        data: transactions,
    });
}));
const getTransactionByMemberId = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const transactions = yield prisma_1.default.transaction.findMany({
        where: {
            memberId: id,
        },
        orderBy: {
            createdAt: "desc",
        },
        select: {
            id: true,
            bookId: true,
            memberId: true,
            borrowDate: true,
            returnDate: true,
            status: true,
            Member: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
            Book: {
                select: {
                    id: true,
                    title: true,
                    ISBN: true,
                },
            },
        },
    });
    return res.status(200).json({
        success: true,
        message: "Data Fetched Successfully.",
        data: transactions,
    });
}));
const getTransactionByStatus = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { status } = req.params;
    const transactions = yield prisma_1.default.transaction.findMany({
        where: {
            status: status,
        },
        orderBy: {
            createdAt: "desc",
        },
        select: {
            id: true,
            bookId: true,
            memberId: true,
            borrowDate: true,
            returnDate: true,
            status: true,
            Member: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
            Book: {
                select: {
                    id: true,
                    title: true,
                    ISBN: true,
                },
            },
        },
    });
    return res.status(200).json({
        success: true,
        message: "Data Fetched Successfully.",
        data: transactions,
    });
}));
const deleteTransaction = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield prisma_1.default.transaction.delete({
        where: { id: id },
    });
    return res.status(200).json({
        success: true,
        message: "Transaction Deleted Successfully.",
    });
}));
const transactionController = {
    createNewTransaction,
    getTransactionByBookId,
    getTransactionByMemberId,
    getTransactionByStatus,
    getallTransaction,
    singleTransaction,
    updateTransaction,
    deleteTransaction,
};
exports.default = transactionController;
