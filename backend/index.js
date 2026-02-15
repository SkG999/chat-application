import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/database.js";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
const app = express();
dotenv.config();
const PORT = process.env.PORT || 8080;
connectDb();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
//Routes
app.use("/api/v1/user", userRoutes);
app.listen(PORT, () => {
  console.log(`App is running on Port${PORT}`);
});
