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
const prisma_1 = __importDefault(require("../prisma"));
const HttpException_1 = __importDefault(require("../utils/HttpException"));
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
// create new book
const createNewBook = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const resBody = req.body;
    const { title, author, genre, publishedOn, quantity, selfNo, pages } = resBody;
    const bookExist = yield prisma_1.default.books.findFirst({
        where: {
            ISBN: resBody.isbn,
        },
    });
    if (bookExist)
        throw new HttpException_1.default("Book Already Exist.", 400);
    const newBook = yield prisma_1.default.books.create({
        data: {
            title,
            ISBN: resBody.isbn,
            author,
            genre,
            publishedOn,
            quantity,
            selfNo,
            pages,
        },
    });
    return res.status(201).json({
        success: true,
        message: "Book Created Successfully.",
        data: newBook,
    });
}));
// get all books added pagination
const getAllBooks = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page } = req.query;
    const books = yield prisma_1.default.books.findMany({
        orderBy: {
            createdAt: "desc",
        },
        // added pagination
        take: Number(limit),
        skip: Number(limit) * (Number(page) - 1),
    });
    return res.status(200).json({
        success: true,
        // added pagination
        docs: {
            page: Number(page),
            limit: Number(limit),
            total: yield prisma_1.default.books.count(),
        },
        message: "Data Fetched Successfully.",
        data: books,
    });
}));
// get single book by id
const getSingleBook = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const singleBook = yield prisma_1.default.books.findUnique({
        where: { id: id },
    });
    return res.status(200).json({
        success: true,
        message: "Single Data Fetched Successfully.",
        data: singleBook,
    });
}));
// get book by search
const getBookBySearch = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { q } = req.query;
    const search = q;
    const books = yield prisma_1.default.books.findMany({
        where: {
            OR: [
                {
                    ISBN: {
                        contains: search,
                    },
                },
                {
                    title: {
                        contains: search,
                    },
                },
                {
                    author: {
                        contains: search,
                    },
                },
                {
                    genre: {
                        has: search,
                    },
                },
            ],
        },
        orderBy: {
            title: "asc",
        },
    });
    return res.status(200).json({
        success: true,
        message: "Search Data Fetched Successfully.",
        count: books.length,
        data: books,
    });
}));
// update book by id
const updateBook = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const resBody = req.body;
    const { title, author, genre, publishedOn, quantity, selfNo, pages } = resBody;
    yield prisma_1.default.books.update({
        where: { id: id },
        data: {
            title,
            ISBN: resBody.isbn,
            author,
            genre,
            publishedOn,
            quantity,
            selfNo,
            pages,
        },
    });
    return res.status(200).json({
        success: true,
        message: "Book Updated Successfully.",
        data: yield prisma_1.default.books.findUnique({
            where: { id: id },
        }),
    });
}));
// delete book by id
const deleteBook = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield prisma_1.default.books.delete({
        where: { id: id },
    });
    return res.status(200).json({
        success: true,
        message: "Book Deleted Successfully.",
    });
}));
const bookController = {
    createNewBook,
    getAllBooks,
    getSingleBook,
    getBookBySearch,
    updateBook,
    deleteBook,
};
exports.default = bookController;
