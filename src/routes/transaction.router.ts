import { Router } from "express";

import transactionController from "../controllers/transaction.controller";

const router = Router();

router.post(
  "/v1/library/transaction",
  transactionController.createNewTransaction
);
router.get("/v1/library/transaction", transactionController.getallTransaction);

router.get(
  "/v1/library/transaction/:id",
  transactionController.singleTransaction
);

router.get(
  "/v1/library/transaction/member/:id",
  transactionController.getTransactionByMemberId
);
router.get(
  "/v1/library/transaction/book/:id",
  transactionController.getTransactionByBookId
);
router.get(
  "/v1/library/transaction/status/:status",
  transactionController.getTransactionByStatus
);
router.put(
  "/v1/library/transaction/:id",
  transactionController.updateTransaction
);
router.delete(
  "/v1/library/transaction/:id",
  transactionController.deleteTransaction
);

const transactionRouter = router;
export default transactionRouter;
