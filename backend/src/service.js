import express from "express";
import { connectDb, disconnectDb } from "./config/db.js";
import authRoute from "./routes/authRoutes.js";
import doctorRoute from "./routes/doctorRoutes.js";
import appointmentRoute from "./routes/appointmentRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import { config } from "dotenv";
config();

connectDb();

const app = express();
const port = process.env.PORT || 5001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/auth", authRoute);
app.use("/doctorDetails", doctorRoute);
app.use("/book", appointmentRoute);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  console.log("Production mode: serving frontend from dist");

  app.use(express.static(path.join(__dirname, "../../frontend/dist")));

  app.get("/{*path}", (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist", "index.html"));
  });
}

process.on("SIGINT", disconnectDb);
process.on("SIGTERM", disconnectDb);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
