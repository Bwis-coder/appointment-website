import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(2, "must be at least two characters"),
  email: z.string().email("invalid email address"),
  password: z.string().min(5, "password must be at least 5 characters"),
});

const logInSchema = z.object({
  email: z.string().min(1).email("invalid email address"),
  password: z.string().min(1, "password is required"),
});


export { registerSchema, logInSchema };