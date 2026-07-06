const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const shipmentRoutes = require("./routes/shipmentRoutes");

connectDB();   // <-- આ line જરૂરી છે

const app = express();
const frontendPath = path.join(__dirname, "frontend");

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    if (req.path.endsWith(".html/")) {
        return res.redirect(301, req.originalUrl.slice(0, -1));
    }

    next();
});
app.use(express.static(frontendPath));
app.use("/backend/frontend", express.static(frontendPath));

app.get("/", (req, res) => {
    res.sendFile(path.join(frontendPath, "login.html"));
});

app.use("/api/auth", authRoutes);
app.use("/api/shipments", shipmentRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
