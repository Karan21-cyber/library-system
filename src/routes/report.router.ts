import { Router } from "express";
import reportController from "../controllers/report.controller";

const router = Router();

router.get("/v1/library/report", reportController.getReport);
router.get("/v1/library/report/:id", reportController.getSingleReport);
router.get("/v1/library/report/book/:id", reportController.getReportByBookId);
router.put("/v1/library/report/:id", reportController.updateReport);
router.delete("/v1/library/report/:id", reportController.deleteReport);

const reportRouter = router;

export default reportRouter;
