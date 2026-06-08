import noteModel from "../models/noteModel.js";

const addNote = async (req, res) => {
  try {
    const { leadId, content, followUpDate } = req.body;
    if (!leadId) return res.status(400).json({ message: "Lead ID is required" });
    if (!content) return res.status(400).json({ message: "Content is required" });

    const note = await noteModel.create({ leadId, content, followUpDate });
    res.status(201).json({ message: "Note created", note });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllNotes = async (req, res) => {
  try {
    const notes = await noteModel.find();
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getNotesByLead = async (req, res) => {
  try {
    const { leadId } = req.params;
    const notes = await noteModel.find({ leadId });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateNote = async (req, res) => {
  try {
    const { noteId } = req.params;
    const { content, followUpDate } = req.body;
    const note = await noteModel.findByIdAndUpdate(noteId, { content, followUpDate }, { new: true });
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ message: "Note updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteNote = async (req, res) => {
  try {
    const { noteId } = req.params;
    const deleted = await noteModel.findByIdAndDelete(noteId);
    if (!deleted) return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { addNote, getAllNotes, getNotesByLead, updateNote, deleteNote };
