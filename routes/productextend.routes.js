const router = require("express").Router();
const ProductExtend = require("../models/ProductExtend.model");
const Product = require("../models/Product.model");

// Create a new ProductExtend
router.post("/", async (req, res) => {
    try {
        const { productId, purchasePrice, salePrice, commissionRate, attritionRate, taxRate, discountRate, supplierId } = req.body;

        // Check if ProductExtend already exists for this product
        const existingProductExtend = await ProductExtend.findOne({ productId });
        if (existingProductExtend) {
            return res.status(400).json({ message: "ProductExtend already exists for this product" });
        }

        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const productExtend = new ProductExtend({
            productId,
            purchasePrice,
            salePrice,
            commissionRate,
            attritionRate,
            taxRate,
            discountRate,
            supplierId
        });

        await productExtend.save();

        // Populate referenced fields
        await productExtend.populate("productId supplierId");

        res.status(201).json(productExtend);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all ProductExtends
router.get("/", async (req, res) => {
    try {
        const productExtends = await ProductExtend.find()
            .populate("productId")
            .populate("supplierId");

        res.json(productExtends);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single ProductExtend by ID
router.get("/:id", async (req, res) => {
    try {
        const productExtend = await ProductExtend.findById(req.params.id)
            .populate("productId")
            .populate("supplierId");

        if (!productExtend) {
            return res.status(404).json({ message: "ProductExtend not found" });
        }

        res.json(productExtend);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a ProductExtend
router.put("/:id", async (req, res) => {
    try {
        const { purchasePrice, salePrice, commissionRate, attritionRate, taxRate, discountRate, supplierId } = req.body;

        const productExtend = await ProductExtend.findById(req.params.id);
        if (!productExtend) {
            return res.status(404).json({ message: "ProductExtend not found" });
        }

        // Update fields
        if (purchasePrice !== undefined) productExtend.purchasePrice = purchasePrice;
        if (salePrice !== undefined) productExtend.salePrice = salePrice;
        if (commissionRate !== undefined) productExtend.commissionRate = commissionRate;
        if (attritionRate !== undefined) productExtend.attritionRate = attritionRate;
        if (taxRate !== undefined) productExtend.taxRate = taxRate;
        if (discountRate !== undefined) productExtend.discountRate = discountRate;
        if (supplierId !== undefined) productExtend.supplierId = supplierId;

        await productExtend.save();

        // Populate referenced fields
        await productExtend.populate("productId supplierId");

        res.json(productExtend);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a ProductExtend
router.delete("/:id", async (req, res) => {
    try {
        const productExtend = await ProductExtend.findById(req.params.id);
        if (!productExtend) {
            return res.status(404).json({ message: "ProductExtend not found" });
        }

        await productExtend.remove();

        res.json({ message: "ProductExtend deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get ProductExtend by productId
router.get("/by-product/:productId", async (req, res) => {
    try {
        const productExtend = await ProductExtend.findOne({ productId: req.params.productId })
            .populate("productId")
            .populate("supplierId");

        if (!productExtend) {
            return res.status(404).json({ message: "ProductExtend not found for this product" });
        }

        res.json(productExtend);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update prices for a ProductExtend
router.put("/:id/prices", async (req, res) => {
    try {
        const { purchasePrice, salePrice, commissionRate, attritionRate, taxRate, discountRate } = req.body;

        const productExtend = await ProductExtend.findById(req.params.id);
        if (!productExtend) {
            return res.status(404).json({ message: "ProductExtend not found" });
        }

        await productExtend.updatePrices(purchasePrice, salePrice, commissionRate, attritionRate, taxRate, discountRate);

        // Populate referenced fields
        await productExtend.populate("productId supplierId");

        res.json(productExtend);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
