import express from "express";
import { loginUser, registerUser } from "../controllers/userController";

const router = express.Router();

router.post("/sign_in", registerUser);
router.post("/login", loginUser);

export default router;
