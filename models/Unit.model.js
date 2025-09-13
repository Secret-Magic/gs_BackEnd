const mongoose = require("mongoose");

const unitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: 50,
    },
    abbreviation: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: 10,
    },
    description: {
        type: String,
        trim: true,
        maxlength: 200,
    },
    conversionFactor: {
        type: Number,
        required: true,
        min: 0.0001,
        default: 1,
    },
    
    isActive: {
        type: Boolean,
        default: true,
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
unitSchema.pre("save", function (next) {
    this.updatedAt = new Date();
    next();
});

const Unit = mongoose.model("Unit", unitSchema);

module.exports = Unit;
