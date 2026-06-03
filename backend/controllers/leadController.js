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
export { createLead, getAllLead };
