import mongoose from "mongoose";
const noteSchema = mongoose.Schema(
  {
    leadId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "lead",
    },
    content: {
      type: String,
      required: true,
    },
    followUpDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("note", noteSchema);
