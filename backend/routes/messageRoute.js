import express from "express";
const router = express.Router();
import { sendMessage } from "./../controllers/messageController.js";
import { isAuthenticated } from "./../middleware/isAuthenticated.js";
router.post("/send/:id", isAuthenticated, sendMessage);
export default router;
