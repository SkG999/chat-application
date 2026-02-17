import express from "express";
const router = express.Router();
import { getMessage, sendMessage } from "./../controllers/messageController.js";
import { isAuthenticated } from "./../middleware/isAuthenticated.js";
router.post("/send/:id", isAuthenticated, sendMessage);
router.get("/:id", isAuthenticated, getMessage);
export default router;
