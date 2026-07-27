import express from "express";
import authRoute from "./routes/authRoutes.js";
import { connectDb, disconnectDb } from "./config/db.js";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";

connectDb();

const app = express();
const port = process.env.BACKEND_URL;

// body parser middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http//localhost:5173",
    credentials: true,
  }),
);

//Routes
app.use("/auth", authRoute);

process.on("SIGINT", disconnectDb);
process.on("SIGTERM", disconnectDb);

app.listen(port, () => {
  console.log(`server running on: ${port}`);
});
