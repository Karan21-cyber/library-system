import { Router } from "express";
import authController from "../controllers/auth.controller";

const router = Router();

router.post("/v1/library/login", authController.login);

const authrouter = router;
export default authrouter;
