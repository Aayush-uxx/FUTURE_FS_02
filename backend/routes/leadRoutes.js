import { createLead, getAllLead } from "../controllers/leadController.js";
import express from "express";
const router = express.Router();
router.post("/createLead", createLead);
router.get("/getAllLead", getAllLead);
export default router;
