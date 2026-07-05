const Shipment = require("../models/Shipment");

// ================= Create Shipment =================
exports.createShipment = async (req, res) => {
    try {

        const {
            shipmentNo,
            customerName,
            origin,
            destination,
            status
        } = req.body;

        const shipment = await Shipment.create({
            shipmentNo,
            customerName,
            origin,
            destination,
            status,
            user: req.user.id
        });

        res.status(201).json({
            message: "Shipment Created Successfully",
            shipment
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

// ================= Get Shipments =================
exports.getShipments = async (req, res) => {
    try {

        const shipments = await Shipment.find({
            user: req.user.id
        });

        res.json(shipments);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

// ================= Update Shipment =================
exports.updateShipment = async (req, res) => {
    try {

        const shipment = await Shipment.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user.id
            },
            req.body,
            {
                new: true
            }
        );

        if (!shipment) {
            return res.status(404).json({
                message: "Shipment Not Found"
            });
        }

        res.json({
            message: "Shipment Updated Successfully",
            shipment
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

// ================= Delete Shipment =================
exports.deleteShipment = async (req, res) => {
    try {

        const shipment = await Shipment.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id
        });

        if (!shipment) {
            return res.status(404).json({
                message: "Shipment Not Found"
            });
        }

        res.json({
            message: "Shipment Deleted Successfully"
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};