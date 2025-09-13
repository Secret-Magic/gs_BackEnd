const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
    },
    description: {
        type: String,
        trim: true,
        maxlength: 500,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    unit: {
        type: String,
        required: true,
        enum: ["لتر", "جركن", "قطعة", "كرتونة", "عبوة", "وحدة أخرى"],
    },
    category: {
        type: String,
        required: true,
        enum: ["بنزين", "ديزل", "غاز", "زيوت", "إضافات", "مستلزمات أخرى"],
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
    },
    minQuantity: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
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
productSchema.pre("save", function (next) {
    this.updatedAt = new Date();
    next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
