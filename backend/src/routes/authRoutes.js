import express from "express";
import { Register, logIn, logOut } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", Register);
router.post("/login", logIn);
router.post("/logout", logOut);

export default router;
