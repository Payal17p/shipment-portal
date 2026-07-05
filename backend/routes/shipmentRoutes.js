const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
    createShipment,
    getShipments,
    updateShipment,
    deleteShipment
} = require("../controllers/shipmentController");

// Create Shipment
router.post("/", auth, createShipment);

// Get All Shipments
router.get("/", auth, getShipments);

// Update Shipment
router.put("/:id", auth, updateShipment);

// Delete Shipment
router.delete("/:id", auth, deleteShipment);

module.exports = router;