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
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const getReport = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const report = yield prisma_1.default.report.findMany({
        orderBy: {
            createdAt: "desc",
        },
        select: {
            id: true,
            memberborrows: true,
            bookId: true,
            book: {
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
        data: report,
    });
}));
const getSingleReport = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const singleReport = yield prisma_1.default.report.findUnique({
        where: { id: id },
        select: {
            id: true,
            memberborrows: true,
            bookId: true,
            book: {
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
        data: singleReport,
    });
}));
const getReportByBookId = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    const report = yield prisma_1.default.report.findMany({
        where: {
            bookId: bookId,
        },
        orderBy: {
            createdAt: "desc",
        },
        select: {
            id: true,
            memberborrows: true,
            bookId: true,
            book: {
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
        data: report,
    });
}));
const updateReport = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const resBody = req.body;
    yield prisma_1.default.report.update({
        where: { id: id },
        data: resBody,
    });
    return res.status(200).json({
        success: true,
        message: "Report Updated Successfully.",
        data: yield prisma_1.default.report.findUnique({
            where: { id: id },
        }),
    });
}));
const deleteReport = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield prisma_1.default.report.delete({
        where: { id: id },
    });
    return res.status(200).json({
        success: true,
        message: "Report Deleted Successfully.",
    });
}));
const reportController = {
    getReport,
    getSingleReport,
    getReportByBookId,
    updateReport,
    deleteReport,
};
exports.default = reportController;
