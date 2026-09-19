import express from "express";
import { appointmentSlots } from "../controllers/appointmentSlot.js";
import  authMiddleware  from "../middleware/auth-middleware.js";

const route = express.Router();

route.use(authMiddleware);

route.post("/bookAppointment", appointmentSlots);

export default route;
