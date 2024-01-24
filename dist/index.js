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
const express_1 = __importDefault(require("express"));
const prisma_1 = __importDefault(require("./prisma"));
const auth_router_1 = __importDefault(require("./routes/auth.router"));
const member_router_1 = __importDefault(require("./routes/member.router"));
const error_middleware_1 = __importDefault(require("./middleware/error.middleware"));
const book_router_1 = __importDefault(require("./routes/book.router"));
const transaction_router_1 = __importDefault(require("./routes/transaction.router"));
const report_router_1 = __importDefault(require("./routes/report.router"));
const insertDatainBooks_1 = __importDefault(require("./utils/insertDatainBooks"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
//using the router in server
app.use(auth_router_1.default, member_router_1.default, book_router_1.default, transaction_router_1.default, report_router_1.default);
// add the list of books in one click
app.post("/v1/library/insertBooks", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const resresult = yield insertDatainBooks_1.default.map((book) => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma_1.default.books.create({
            data: {
                title: book.title,
                ISBN: book.isbn,
                author: book.author,
                genre: book.genre,
                publishedOn: book.publishedOn,
                quantity: book.quantity,
                selfNo: book.selfNo,
                pages: book.pages,
            },
        });
    }));
    if (resresult) {
        return res.status(200).json({
            success: true,
            message: "Data Inserted Successfully",
            data: { data: yield prisma_1.default.books.findMany() },
        });
    }
    return res.status(200).json({
        success: false,
        message: "Data Not Inserted",
        data: prisma_1.default.books.findMany(),
    });
}));
// delete all teh books related to the ISBN in one click
app.delete("/v1/library/deleteBooks", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (insertDatainBooks_1.default === null || insertDatainBooks_1.default === void 0 ? void 0 : insertDatainBooks_1.default.map((book) => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma_1.default.books.deleteMany({
            where: {
                ISBN: book.isbn,
            },
        });
    })));
    if (result) {
        return res.status(200).json({
            success: true,
            message: "Data Deleted Successfully",
            data: result,
        });
    }
    return res.status(200).json({
        success: false,
        message: "Data Not Deleted",
        data: result,
    });
}));
app.use(error_middleware_1.default);
prisma_1.default
    .$connect()
    .then(() => {
    app.listen(5000, () => {
        console.log("Server started on port 5000.");
    });
})
    .catch((err) => {
    console.log("Error connecting to database: ", err);
});
