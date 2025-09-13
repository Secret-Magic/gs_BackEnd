const mongoose = require("mongoose");

const tankSchema = new mongoose.Schema({
    stationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Station",
        required: true,
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    capacity: {
        type: Number,
        required: true,
        min: 0,
    },
    currentStock: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
    },
    // نوع المخزن لتفريق بين خزانات الوقود ومخازن الزيوت
    type: {
        type: String,
        enum: ["وقود", "زيت"],
        required: true,
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
tankSchema.pre("save", function (next) {
    this.updatedAt = new Date();
    next();
});

module.exports = mongoose.model("Tank", tankSchema);

module.exports = Tank;
