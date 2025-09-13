const express = require("express");
const router = express.Router();
const Product = require("../models/Product.model");

// الحصول على جميع المنتجات
router.get("/", async (req, res) => {
    try {
        const products = await Product.find({ isActive: true });
        res.json(products);
    } catch (error) {
        res.status(500).json({
            message: "حدث خطأ في جلب المنتجات",
            error: error.message,
        });
    }
});

// الحصول على منتج معين حسب المعرف
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "المنتج غير موجود" });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({
            message: "حدث خطأ في جلب المنتج",
            error: error.message,
        });
    }
});

// إنشاء منتج جديد
router.post("/", async (req, res) => {
    try {
        const product = new Product({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            unit: req.body.unit,
            category: req.body.category,
            quantity: req.body.quantity,
            minQuantity: req.body.minQuantity,
        });

        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({
            message: "فشل في إنشاء المنتج",
            error: error.message,
        });
    }
});

// تحديث منتج
router.put("/:id", async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                unit: req.body.unit,
                category: req.body.category,
                quantity: req.body.quantity,
                minQuantity: req.body.minQuantity,
                isActive: req.body.isActive,
            },
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({ message: "المنتج غير موجود" });
        }

        res.json(product);
    } catch (error) {
        res.status(400).json({
            message: "فشل في تحديث المنتج",
            error: error.message,
        });
    }
});

// حذف منتج (تغيير الحالة إلى غير نشط)
router.delete("/:id", async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { isActive: false },
            { new: true }
        );

        if (!product) {
            return res.status(404).json({ message: "المنتج غير موجود" });
        }

        res.json({ message: "تم حذف المنتج بنجاح" });
    } catch (error) {
        res.status(500).json({
            message: "فشل في حذف المنتج",
            error: error.message,
        });
    }
});

module.exports = router;
