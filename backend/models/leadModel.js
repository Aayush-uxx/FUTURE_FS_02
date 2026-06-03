import mongoose from "mongoose";
const leadSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      enum: ["website", "referral", "social"],
    },
    status: {
      type: String,
      enum: ["new", "contacted", "converted"],
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("lead", leadSchema);
