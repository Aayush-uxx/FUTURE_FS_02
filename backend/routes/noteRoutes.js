import {
  addNote,
  updateNote,
  getNotesByLead,
  deleteNote,
  getAllNotes,
} from "../controllers/noteController.js";
import express from "express";
const router = express.Router();
router.post("/addNote", addNote);
router.get("/getAllNotes", getAllNotes);
router.put("/update/:noteId", updateNote);
router.get("/getNotesByLead/:leadId", getNotesByLead);
router.delete("/deleteNote/:noteId", deleteNote);
export default router;
