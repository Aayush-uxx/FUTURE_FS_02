import mongoose from "mongoose";

let isConnected = false;

const dbCon = async () => {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
  } catch (error) {
    console.error("Database connection failed:", error.message);
    throw error;
  }
};

export default dbCon;
