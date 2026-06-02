import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dbCon from "./config/db.js";
import authRoute from "./routes/authRoute.js";
dotenv.config();
dbCon();

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use("/api/auth", authRoute);
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
