import express from "express";
import authRoute from "./routes/authRoutes.js";
import { connectDb, disconnectDb } from "./config/db.js";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import doctorRoute from "./routes/doctorRoutes.js";
import appointmentRoute from "./routes/appointmentRoute.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectDb();

const app = express();
const port = process.env.PORT || 5001;

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
app.use("/book", appointmentRoute);

// Serve the built frontend
const frontendPath = path.join(__dirname, "../../frontend/dist");
app.use(express.static(frontendPath));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

process.on("SIGINT", disconnectDb);
process.on("SIGTERM", disconnectDb);

app.listen(port, () => {
  console.log(`server running on: ${process.env.BACKEND_URL}`);
});
