import express from "express";
import authRoute from "./routes/authRoutes.js";
import { connectDb, disconnectDb } from "./config/db.js";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import doctorRoute from "./routes/doctorRoutes.js";

connectDb();

const app = express();
const port = process.env.PORT;

// body parser middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

//Routes
app.use("/auth", authRoute);
app.use("/doctorDetails", doctorRoute);

process.on("SIGINT", disconnectDb);
process.on("SIGTERM", disconnectDb);

app.listen(port, () => {
  console.log(`server running on: ${process.env.BACKEND_URL}`);
});
