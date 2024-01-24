"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const report_controller_1 = __importDefault(require("../controllers/report.controller"));
const router = (0, express_1.Router)();
router.get("/v1/library/report", report_controller_1.default.getReport);
router.get("/v1/library/report/:id", report_controller_1.default.getSingleReport);
router.get("/v1/library/report/book/:id", report_controller_1.default.getReportByBookId);
router.put("/v1/library/report/:id", report_controller_1.default.updateReport);
router.delete("/v1/library/report/:id", report_controller_1.default.deleteReport);
const reportRouter = router;
exports.default = reportRouter;
