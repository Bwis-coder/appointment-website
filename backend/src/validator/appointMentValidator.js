import { z } from "zod";

const appointmentSlotsSchema = z.object({
  doctorId: z.string().uuid("invalid doctor id"),
  day: z.string().min(1, "please select a day"),
  time: z.string().min(1, "please select a time"),
});

export default appointmentSlotsSchema;
