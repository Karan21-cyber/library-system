import { Router } from "express";
import memberController from "../controllers/member.controller";
import validationMiddleware from "../middleware/validation.middleware";
import {
  memberSchema,
  updateMemberSchema,
} from "../validator/member.validator";

const router = Router();

router.post(
  "/v1/library/member",
  validationMiddleware(memberSchema),
  memberController.createMember
);
router.get("/v1/library/member", memberController.getAllMember);
router.get("/v1/library/member/:id", memberController.getSingleMember);
router.put(
  "/v1/library/member/:id",
  validationMiddleware(updateMemberSchema),
  memberController.updateMember
);
router.delete("/v1/library/member/:id", memberController.deleteMember);

const memberRouter = router;

export default memberRouter;
