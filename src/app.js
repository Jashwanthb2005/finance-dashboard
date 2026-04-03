const express = require("express"); 
const mongoose = require("mongoose"); 
require("dotenv").config(); 
const userRoutes = require("./routes/user_routes");
const recordRoutes = require("./routes/record_routes");
const analyticsRoutes = require("./routes/analytics_routes");
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

app.use("/api/users", userRoutes);

app.use(express.static("public"));

app.use("/api/records", recordRoutes);
app.use("/api/analytics", analyticsRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
