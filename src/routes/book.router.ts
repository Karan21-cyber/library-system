import { Router } from "express";

import bookController from "../controllers/book.controller";

const router = Router();

router.get("/v1/library/book", bookController.getAllBooks);
router.get("/v1/library/book/:id", bookController.getSingleBook);
router.post("/v1/library/book/search", bookController.getBookBySearch);
router.post("/v1/library/book", bookController.createNewBook);
router.put("/v1/library/book/:id", bookController.updateBook);
router.delete("/v1/library/book/:id", bookController.deleteBook);

const bookRouter = router;

export default bookRouter;

