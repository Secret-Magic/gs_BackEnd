
const express = require("express");
const router = express.Router();
const Pump = require("../models/Pump");

// الحصول على جميع مضخات محطة الوقود
router.get("/", async (req, res) => {
    try {
        const pumps = await Pump.find({});
        res.json(pumps);
    } catch (error) {
        res.status(500).json({
            message: "حدث خطأ في جلب المضخات",
            error: error.message,
        });
    }
});

// الحصول على مضخة معينة حسب المعرف
router.get("/:id", async (req, res) => {
    try {
        const pump = await Pump.findById(req.params.id);
        if (!pump) {
            return res.status(404).json({ message: "المضخة غير موجودة" });
        }
        res.json(pump);
    } catch (error) {
        res.status(500).json({
            message: "حدث خطأ في جلب المضخة",
            error: error.message,
        });
    }
});

// إنشاء مضخة جديدة
router.post("/", async (req, res) => {
    try {
        const pump = new Pump({
            stationId: req.body.stationId,
            pumpNumber: req.body.pumpNumber,
            productId: req.body.productId,
            currentReading: req.body.currentReading || 0,
        });

        const savedPump = await pump.save();
        res.status(201).json(savedPump);
    } catch (error) {
        res.status(400).json({
            message: "فشل في إنشاء المضخة",
            error: error.message,
        });
    }
});

// تحديث مضخة
router.put("/:id", async (req, res) => {
    try {
        const pump = await Pump.findByIdAndUpdate(
            req.params.id,
            {
                stationId: req.body.stationId,
                pumpNumber: req.body.pumpNumber,
                productId: req.body.productId,
                currentReading: req.body.currentReading,
            },
            { new: true, runValidators: true }
        );

        if (!pump) {
            return res.status(404).json({ message: "المضخة غير موجودة" });
        }

        res.json(pump);
    } catch (error) {
        res.status(400).json({
            message: "فشل في تحديث المضخة",
            error: error.message,
        });
    }
});

// حذف مضخة
router.delete("/:id", async (req, res) => {
    try {
        const pump = await Pump.findByIdAndDelete(req.params.id);

        if (!pump) {
            return res.status(404).json({ message: "المضخة غير موجودة" });
        }

        res.json({ message: "تم حذف المضخة بنجاح" });
    } catch (error) {
        res.status(500).json({
            message: "فشل في حذف المضخة",
            error: error.message,
        });
    }
});

module.exports = router;
