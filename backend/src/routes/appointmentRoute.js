import express from "express";
import {
  appointmentSlots,
  appointmentHistory,
  cancelAppointment,
} from "../controllers/appointmentSlot.js";
import authMiddleware from "../middleware/auth-middleware.js";
import appointmentValidator from "../middleware/validateMiddleware.js";
import appointmentShema from "../validator/appointMentValidator.js";

const route = express.Router();

route.use(authMiddleware);

route.post(
  "/bookAppointment",
  appointmentValidator(appointmentShema),
  appointmentSlots,
);

route.get("/appointmentHistory", appointmentHistory);

route.put("/cancelAppointment/:id", cancelAppointment);

export default route;
