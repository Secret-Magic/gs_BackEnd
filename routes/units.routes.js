const express = require("express");
const router = express.Router();
const Unit = require("../models/Unit.model");

// الحصول على جميع الوحدات
router.get("/", async (req, res) => {
    try {
        const { isActive } = req.query;
        let filter = {};

        if (isActive !== undefined) {
            filter.isActive = isActive === "true";
        }

        const units = await Unit.find(filter);
        res.json(units);
    } catch (error) {
        res.status(500).json({
            message: "حدث خطأ في جلب الوحدات",
            error: error.message,
        });
    }
});

// الحصول على وحدة معينة حسب المعرف
router.get("/:id", async (req, res) => {
    try {
        const unit = await Unit.findById(req.params.id);
        if (!unit) {
            return res.status(404).json({ message: "الوحدة غير موجودة" });
        }
        res.json(unit);
    } catch (error) {
        res.status(500).json({
            message: "حدث خطأ في جلب الوحدة",
            error: error.message,
        });
    }
});

// إنشاء وحدة جديدة
router.post("/", async (req, res) => {
    try {
        const unit = new Unit({
            name: req.body.name,
            abbreviation: req.body.abbreviation,
            description: req.body.description,
            conversionFactor: req.body.conversionFactor,
            baseUnit: req.body.baseUnit,
        });

        const savedUnit = await unit.save();
        res.status(201).json(savedUnit);
    } catch (error) {
        res.status(400).json({
            message: "فشل في إنشاء الوحدة",
            error: error.message,
        });
    }
});

// تحديث وحدة
router.put("/:id", async (req, res) => {
    try {
        const unit = await Unit.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                abbreviation: req.body.abbreviation,
                description: req.body.description,
                conversionFactor: req.body.conversionFactor,
                baseUnit: req.body.baseUnit,
                isActive: req.body.isActive,
            },
            { new: true, runValidators: true }
        );

        if (!unit) {
            return res.status(404).json({ message: "الوحدة غير موجودة" });
        }

        res.json(unit);
    } catch (error) {
        res.status(400).json({
            message: "فشل في تحديث الوحدة",
            error: error.message,
        });
    }
});

// حذف وحدة (تغيير الحالة إلى غير نشط)
router.delete("/:id", async (req, res) => {
    try {
        const unit = await Unit.findByIdAndUpdate(
            req.params.id,
            { isActive: false },
            { new: true }
        );

        if (!unit) {
            return res.status(404).json({ message: "الوحدة غير موجودة" });
        }

        res.json({ message: "تم حذف الوحدة بنجاح" });
    } catch (error) {
        res.status(500).json({
            message: "فشل في حذف الوحدة",
            error: error.message,
        });
    }
});

module.exports = router;
