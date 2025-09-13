
const express = require("express");
const router = express.Router();
const Tank = require("../models/Tank");

// الحصول على جميع الخزانات
router.get("/", async (req, res) => {
    try {
        const tanks = await Tank.find({});
        res.json(tanks);
    } catch (error) {
        res.status(500).json({
            message: "حدث خطأ في جلب الخزانات",
            error: error.message,
        });
    }
});

// الحصول على خزان معين حسب المعرف
router.get("/:id", async (req, res) => {
    try {
        const tank = await Tank.findById(req.params.id);
        if (!tank) {
            return res.status(404).json({ message: "الخزان غير موجود" });
        }
        res.json(tank);
    } catch (error) {
        res.status(500).json({
            message: "حدث خطأ في جلب الخزان",
            error: error.message,
        });
    }
});

// إنشاء خزان جديد
router.post("/", async (req, res) => {
    try {
        const tank = new Tank({
            stationId: req.body.stationId,
            productId: req.body.productId,
            capacity: req.body.capacity,
            currentStock: req.body.currentStock || 0,
            type: req.body.type,
        });

        const savedTank = await tank.save();
        res.status(201).json(savedTank);
    } catch (error) {
        res.status(400).json({
            message: "فشل في إنشاء الخزان",
            error: error.message,
        });
    }
});

// تحديث خزان
router.put("/:id", async (req, res) => {
    try {
        const tank = await Tank.findByIdAndUpdate(
            req.params.id,
            {
                stationId: req.body.stationId,
                productId: req.body.productId,
                capacity: req.body.capacity,
                currentStock: req.body.currentStock,
                type: req.body.type,
            },
            { new: true, runValidators: true }
        );

        if (!tank) {
            return res.status(404).json({ message: "الخزان غير موجود" });
        }

        res.json(tank);
    } catch (error) {
        res.status(400).json({
            message: "فشل في تحديث الخزان",
            error: error.message,
        });
    }
});

// حذف خزان
router.delete("/:id", async (req, res) => {
    try {
        const tank = await Tank.findByIdAndDelete(req.params.id);

        if (!tank) {
            return res.status(404).json({ message: "الخزان غير موجود" });
        }

        res.json({ message: "تم حذف الخزان بنجاح" });
    } catch (error) {
        res.status(500).json({
            message: "فشل في حذف الخزان",
            error: error.message,
        });
    }
});

module.exports = router;
