import express from "express";
import authRoute from "./routes/authRoutes.js";
import { connectDb, disconnectDb } from "./config/db.js";
import "dotenv/config";

connectDb();

const app = express();
const port = 5001;

// body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoute);

process.on("SIGINT", disconnectDb);
process.on("SIGTERM", disconnectDb);

app.listen(port, () => {
  console.log(`server running on: ${port}`);
});
