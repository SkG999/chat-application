import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/database.js";
const app = express();
dotenv.config();
const PORT = process.env.PORT || 8080;
connectDb();

app.listen(PORT, () => {
  console.log(`App is running on Port${PORT}`);
});
