import noteModel from "../models/noteModel.js";
const addNote = async (req, res) => {
  try {
    const { leadId, content, followUpDate } = req.body;
    if (!leadId) return res.status(400).json({ message: "LeadId required" });
    if (!content)
      return res.status(400).json({ message: "Content is required" });
    const createNote = await noteModel.create({
      leadId,
      content,
      followUpDate,
    });
    if (!createNote)
      return res.status(400).json({ message: "Unable to create notes" });
    res.status(201).json({ message: "New note created", note: createNote });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getAllNotes = async (req, res) => {
  try {
    const notes = await noteModel.find();
    if (!notes) return res.status(404).json({ message: "No notes found !" });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getNotesByLead = async (req, res) => {
  try {
    const { leadId } = req.params;
    const notes = await noteModel.find({ leadId });
    if (!notes) return res.status(404).json({ message: "No notes found !" });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateNote = async (req, res) => {
  try {
    const { noteId } = req.params;
    const { content, followUpDate } = req.body;
    const note = await noteModel.findByIdAndUpdate(
      noteId,
      { content, followUpDate },
      { new: true }
    );
    if (!note)
      return res.status(404).json({ message: "No note found to update" });
    res.status(200).json({ message: "Note updated successfull" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteNote = async (req, res) => {
  try {
    const { noteId } = req.params;
    const deletedNote = await noteModel.findByIdAndDelete(noteId);
    if (!deletedNote)
      return res.status(404).json({ message: "No notes found to delete" });
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export { addNote, getAllNotes, getNotesByLead, updateNote, deleteNote };
