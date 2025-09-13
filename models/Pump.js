const mongoose = require("mongoose");

const pumpSchema = new mongoose.Schema({
    stationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Station",
        required: true,
    },
    pumpNumber: {
        type: String,
        required: true,
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    currentReading: {
        type: Number,
        default: 0,
        min: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// تحديث التاريخ عند التعديل
pumpSchema.pre("save", function (next) {
    this.updatedAt = new Date();
    next();
});

module.exports = mongoose.model("Pump", pumpSchema);
