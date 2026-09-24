import express from "express";
import { Register, logIn, logOut } from "../controllers/authController.js";
import { registerSchema, logInSchema } from "../validator/authValidator.js";
import authValidator from "../middleware/validateMiddleware.js";

const router = express.Router();

router.post("/register", authValidator(registerSchema), Register);
router.post("/login", authValidator(logInSchema), logIn);
router.post("/logout", logOut);

export default router;
