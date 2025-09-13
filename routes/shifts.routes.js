
const express = require("express");
const router = express.Router();
const Shift = require("../models/Shift");

// الحصول على جميع الورديات
router.get("/", async (req, res) => {
    try {
        const shifts = await Shift.find({});
        res.json(shifts);
    } catch (error) {
        res.status(500).json({
            message: "حدث خطأ في جلب الورديات",
            error: error.message,
        });
    }
});

// الحصول على ورديه معينة حسب المعرف
router.get("/:id", async (req, res) => {
    try {
        const shift = await Shift.findById(req.params.id);
        if (!shift) {
            return res.status(404).json({ message: "الورديه غير موجودة" });
        }
        res.json(shift);
    } catch (error) {
        res.status(500).json({
            message: "حدث خطأ في جلب الورديه",
            error: error.message,
        });
    }
});

// إنشاء ورديه جديدة
router.post("/", async (req, res) => {
    try {
        const shift = new Shift({
            employeeId: req.body.employeeId,
            stationId: req.body.stationId,
            startTime: req.body.startTime || new Date(),
            endTime: req.body.endTime,
            shiftStatus: req.body.shiftStatus || "جاري",
            startReadings: req.body.startReadings || [],
            endReadings: req.body.endReadings || [],
            oilInventory: req.body.oilInventory || [],
        });

        const savedShift = await shift.save();
        res.status(201).json(savedShift);
    } catch (error) {
        res.status(400).json({
            message: "فشل في إنشاء الورديه",
            error: error.message,
        });
    }
});

// تحديث ورديه
router.put("/:id", async (req, res) => {
    try {
        const shift = await Shift.findByIdAndUpdate(
            req.params.id,
            {
                employeeId: req.body.employeeId,
                stationId: req.body.stationId,
                startTime: req.body.startTime,
                endTime: req.body.endTime,
                shiftStatus: req.body.shiftStatus,
                startReadings: req.body.startReadings,
                endReadings: req.body.endReadings,
                oilInventory: req.body.oilInventory,
            },
            { new: true, runValidators: true }
        );

        if (!shift) {
            return res.status(404).json({ message: "الورديه غير موجودة" });
        }

        res.json(shift);
    } catch (error) {
        res.status(400).json({
            message: "فشل في تحديث الورديه",
            error: error.message,
        });
    }
});

// حذف ورديه
router.delete("/:id", async (req, res) => {
    try {
        const shift = await Shift.findByIdAndDelete(req.params.id);

        if (!shift) {
            return res.status(404).json({ message: "الورديه غير موجودة" });
        }

        res.json({ message: "تم حذف الورديه بنجاح" });
    } catch (error) {
        res.status(500).json({
            message: "فشل في حذف الورديه",
            error: error.message,
        });
    }
});

module.exports = router;
