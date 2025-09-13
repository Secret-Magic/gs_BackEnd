const mongoose = require("mongoose");

const shiftSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    stationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Station",
        required: true,
    },
    startTime: {
        type: Date,
        default: Date.now,
    },
    endTime: {
        type: Date,
    },
    shiftStatus: {
        type: String,
        enum: ["جاري", "منتهية"],
        default: "جاري",
    },
    // قراءات العدادات في بداية الوردية
    startReadings: [
        {
            pumpId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Pump",
            },
            reading: {
                type: Number,
            },
        },
    ],
    // قراءات العدادات في نهاية الوردية
    endReadings: [
        {
            pumpId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Pump",
            },
            reading: {
                type: Number,
            },
        },
    ],
    // جرد الزيوت
    oilInventory: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
            startQuantity: {
                type: Number,
                default: 0,
            },
            endQuantity: {
                type: Number,
                default: 0,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
            updatedAt: {
                type: Date,
                default: Date.now,
            },
        },
    ],
});

// تحديث التاريخ عند التعديل
shiftSchema.pre("save", function (next) {
    this.updatedAt = new Date();
    next();
});

module.exports = mongoose.model("Shift", shiftSchema);
