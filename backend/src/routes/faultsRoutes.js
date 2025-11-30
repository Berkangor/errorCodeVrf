// src/routes/faultsRoutes.js
const express = require("express");
const router = express.Router();
const {
  getAllFaults,
  searchFaultByMarkaKod
} = require("../controllers/faultsController");

// Tüm arızalar + query ile filtreleme
router.get("/", getAllFaults);

// Marka + kod ile arama
// Örn: /api/v1/faults/search?marka=LG&kod=53-1
router.get("/search", searchFaultByMarkaKod);

module.exports = router;
