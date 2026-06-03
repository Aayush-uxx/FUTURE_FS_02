import {
  createLead,
  deleteLead,
  getAllLead,
  getLeadById,
  updateLead,
} from "../controllers/leadController.js";
import express from "express";
const router = express.Router();
router.post("/createLead", createLead);
router.get("/getAllLead", getAllLead);
router.get("/getLeadById/:id", getLeadById);
router.put("/updateLead/:id", updateLead);
router.delete("/deleteLead/:id", deleteLead);
export default router;
