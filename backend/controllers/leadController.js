import leadModel from "../models/leadModel.js";
const createLead = async (req, res) => {
  try {
    const { name, email, source, status } = req.body;
    const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
      return res
        .status(400)
        .json({ message: "Please provide a valid email address" });
    }
    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "Name is required" });
    }
    const newLead = await leadModel.create({
      name,
      email,
      source,
      status,
    });
    res.status(201).json({ message: "New Lead created !" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getAllLead = async (req, res) => {
  try {
    const leads = await leadModel.find();
    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getLeadById = async (req, res) => {
  try {
    const { id } = req.params;
    const leads = await leadModel.findById(id);
    if (!leads) return res.status(404).json({ message: "No leads found !" });
    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateLead = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const validStatus = ["new", "contacted", "converted"];
    if (!validStatus.includes(status)) {
      return res.status(400).json({
        message: "Invalid status. Must be: new, contacted, or converted",
      });
    }
    const lead = await leadModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!lead)
      return res.status(404).json({ message: "No lead found for Update !" });
    res.status(200).json({ message: "Status updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteLead = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteLead = await leadModel.findByIdAndDelete(id);
    if (!deleteLead)
      return res.status(404).json({ message: "No Lead found to delete !" });
    res.status(200).json({ message: "Lead deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export { createLead, getAllLead, getLeadById, updateLead, deleteLead };
