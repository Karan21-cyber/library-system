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
// create New Member
const createMember = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const resBody = req.body;
    const email = resBody.email.toLowerCase();
    const userExist = yield prisma_1.default.member.findUnique({
        where: { email: email },
    });
    if (userExist)
        throw new HttpException_1.default("User Already Exist.", 400);
    const member = yield prisma_1.default.member.create({
        data: Object.assign(Object.assign({}, resBody), { email: email }),
    });
    return res.status(201).json({
        success: true,
        message: "Member Created Successfully.",
        data: member,
    });
}));
// get All Members
const getAllMember = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const members = yield prisma_1.default.member.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
    return res.status(200).json({
        success: true,
        message: "Data Fetched Successfully.",
        data: members,
    });
}));
// get Single Member
const getSingleMember = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const singleMember = yield prisma_1.default.member.findUnique({
        where: { id: id },
    });
    if (!singleMember)
        throw new HttpException_1.default("Member Not Found.", 404);
    return res.status(200).json({
        success: true,
        message: "Single Data Fetched Successfully.",
        data: singleMember,
    });
}));
// update Member
const updateMember = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, address, phoneNo, email } = req.body;
    if (email)
        throw new HttpException_1.default("Invalid Fields Passed. Field: email", 400);
    yield prisma_1.default.member.update({
        where: { id: id },
        data: { name, address, phoneNo },
    });
    return res.status(200).json({
        success: true,
        message: "Member Updated Successfully.",
        data: yield prisma_1.default.member.findUnique({
            where: { id: id },
        }),
    });
}));
// delete Member
const deleteMember = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield prisma_1.default.member.delete({
        where: { id: id },
    });
    return res.status(200).json({
        success: true,
        message: "Member Deleted Successfully.",
    });
}));
const memberController = {
    createMember,
    getAllMember,
    getSingleMember,
    updateMember,
    deleteMember,
};
exports.default = memberController;
