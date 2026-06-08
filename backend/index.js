import dotenv from "dotenv";
dotenv.config();

import dbCon from "./config/db.js";
import app from "./server.js";

await dbCon();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
