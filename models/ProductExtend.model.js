const mongoose = require("mongoose");

const productExtendSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
        unique: true
    },
    purchasePrice: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    salePrice: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    wholesalePrice: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    retailPrice: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    commissionRate: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
        default: 0
    },
    commissionValue: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    attritionRate: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
        default: 0
    },
    attritionValue: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    taxRate: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
        default: 0
    },
    taxValue: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    discountRate: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
        default: 0
    },
    discountValue: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    profitMargin: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
        default: 0
    },
    profitValue: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    currency: {
        type: String,
        required: true,
        default: "SYP",
        trim: true
    },
    supplierId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
        required: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// تحديث التاريخ عند التعديل
productExtendSchema.pre("save", function (next) {
    this.updatedAt = new Date();
    next();
});

// Calculate values when prices change
productExtendSchema.pre("save", function (next) {
    if (this.isModified("salePrice") || this.isModified("commissionRate") || this.isModified("attritionRate")) {
        // Calculate commission value
        this.commissionValue = this.salePrice * (this.commissionRate / 100);

        // Calculate attrition value
        this.attritionValue = this.salePrice * (this.attritionRate / 100);

        // Calculate tax value
        this.taxValue = this.salePrice * (this.taxRate / 100);

        // Calculate discount value
        this.discountValue = this.salePrice * (this.discountRate / 100);

        // Calculate profit margin and value
        const totalCosts = this.purchasePrice + this.commissionValue + this.attritionValue + this.taxValue;
        this.profitValue = this.salePrice - totalCosts;
        this.profitMargin = (this.profitValue / this.salePrice) * 100;
    }
    next();
});

// Virtual property for final price after all adjustments
productExtendSchema.virtual("finalPrice").get(function() {
    return this.salePrice - this.discountValue;
});

// Virtual property for total cost
productExtendSchema.virtual("totalCost").get(function() {
    return this.purchasePrice + this.commissionValue + this.attritionValue + this.taxValue;
});

// Method to update prices and recalculate all values
productExtendSchema.methods.updatePrices = function(purchasePrice, salePrice, commissionRate, attritionRate, taxRate, discountRate) {
    this.purchasePrice = purchasePrice;
    this.salePrice = salePrice;
    this.commissionRate = commissionRate;
    this.attritionRate = attritionRate;
    this.taxRate = taxRate;
    this.discountRate = discountRate;

    // This will trigger the pre-save hook to recalculate all values
    return this.save();
};

const ProductExtend = mongoose.model("ProductExtend", productExtendSchema);

module.exports = ProductExtend;
