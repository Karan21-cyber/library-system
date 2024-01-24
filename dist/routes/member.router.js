"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const member_controller_1 = __importDefault(require("../controllers/member.controller"));
const validation_middleware_1 = __importDefault(require("../middleware/validation.middleware"));
const member_validator_1 = require("../validator/member.validator");
const router = (0, express_1.Router)();
router.post("/v1/library/member", (0, validation_middleware_1.default)(member_validator_1.memberSchema), member_controller_1.default.createMember);
router.get("/v1/library/member", member_controller_1.default.getAllMember);
router.get("/v1/library/member/:id", member_controller_1.default.getSingleMember);
router.put("/v1/library/member/:id", (0, validation_middleware_1.default)(member_validator_1.updateMemberSchema), member_controller_1.default.updateMember);
router.delete("/v1/library/member/:id", member_controller_1.default.deleteMember);
const memberRouter = router;
exports.default = memberRouter;
