const express = require("express"); 
const mongoose = require("mongoose"); 
require("dotenv").config(); 

const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB connected successfully");
})
.catch((err) => {
  console.log("MongoDB connection error:", err);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
