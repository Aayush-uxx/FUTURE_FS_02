import mongoose from "mongoose";
const dbCon = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    if (!connection) {
      return console.log("Failed to connect the Database");
    }
    console.log("Database connected Successfully");
  } catch (error) {
    console.log(error.message);
  }
};
export default dbCon;
