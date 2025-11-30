// src/app.js
const express = require("express");
const cors = require("cors");
const faultsRoutes = require("./routes/faultsRoutes");

const app = express();

// Orta katmanlar
app.use(cors());
app.use(express.json());

// Rotalar
app.use("/api/v1/faults", faultsRoutes);

// Basit healthcheck
app.get("/api/v1/health", (req, res) => {
  res.json({ status: "ok" });
});

module.exports = app;
