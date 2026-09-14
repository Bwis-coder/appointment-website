import express from "express";
import { doctorDetails } from "../controllers/doctorControllers.js";
import authMiddleware from "../middleware/auth-middleware.js";

const route = express.Router();

route.use(authMiddleware);
route.get("/", doctorDetails);

export default route;
