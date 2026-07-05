const mongoose = require("mongoose");

const shipmentSchema = new mongoose.Schema(
{
    shipmentNo: {
        type: String,
        required: true
    },
    customerName: {
        type: String,
        required: true
    },
    origin: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "Pending"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("Shipment", shipmentSchema);