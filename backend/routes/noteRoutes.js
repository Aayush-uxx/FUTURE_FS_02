import {
  addNote,
  updateNote,
  getNotesByLead,
  deleteNote,
  getAllNotes,
} from "../controllers/noteController.js";
import validToken from "../middleware/authMiddleware.js";
import express from "express";
const router = express.Router();
router.post("/addNote", validToken, addNote);
router.get("/getAllNotes", validToken, getAllNotes);
router.put("/update/:noteId", validToken, updateNote);
router.get("/getNotesByLead/:leadId", validToken, getNotesByLead);
router.delete("/deleteNote/:noteId", validToken, deleteNote);
export default router;
