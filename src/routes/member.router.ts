import { Router } from "express";
import memberController from "../controllers/member.controller";

const router = Router();

router.post("/v1/library/member", memberController.createMember);
router.get("/v1/library/member", memberController.getAllMember);
router.get("/v1/library/member/:id", memberController.getSingleMember);
router.put("/v1/library/member/:id", memberController.updateMember);
router.delete("/v1/library/member/:id", memberController.deleteMember);

const memberRouter = router;

export default memberRouter;
