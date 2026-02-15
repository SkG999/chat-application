import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/database.js";
import userRoutes from "./routes/userRoutes.js";
const app = express();
dotenv.config();
const PORT = process.env.PORT || 8080;
connectDb();
app.use(express.json());
//Routes
app.use("/api/v1/user", userRoutes);
app.use(express.urlencoded({ extended: true }));
app.listen(PORT, () => {
  console.log(`App is running on Port${PORT}`);
});
