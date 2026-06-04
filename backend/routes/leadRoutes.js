import {
  createLead,
  deleteLead,
  getAllLead,
  getLeadById,
  updateLead,
} from "../controllers/leadController.js";
import validToken from "../middleware/authMiddleware.js";
import express from "express";
const router = express.Router();
router.post("/createLead", validToken, createLead);
router.get("/getAllLead", validToken, getAllLead);
router.get("/getLeadById/:id", validToken, getLeadById);
router.put("/updateLead/:id", validToken, updateLead);
router.delete("/deleteLead/:id", validToken, deleteLead);
export default router;
