
const express = require("express");
const router = express.Router();
const User = require("../models/User");

// الحصول على جميع المستخدمين
router.get("/", async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({
            message: "حدث خطأ في جلب المستخدمين",
            error: error.message,
        });
    }
});

// الحصول على مستخدم معين حسب المعرف
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "المستخدم غير موجود" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({
            message: "حدث خطأ في جلب المستخدم",
            error: error.message,
        });
    }
});

// إنشاء مستخدم جديد
router.post("/", async (req, res) => {
    try {
        const user = new User({
            username: req.body.username,
            password: req.body.password,
            role: req.body.role,
            stationId: req.body.stationId,
        });

        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({
            message: "فشل في إنشاء المستخدم",
            error: error.message,
        });
    }
});

// تحديث مستخدم
router.put("/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            {
                username: req.body.username,
                password: req.body.password,
                role: req.body.role,
                stationId: req.body.stationId,
            },
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({ message: "المستخدم غير موجود" });
        }

        res.json(user);
    } catch (error) {
        res.status(400).json({
            message: "فشل في تحديث المستخدم",
            error: error.message,
        });
    }
});

// حذف مستخدم
router.delete("/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "المستخدم غير موجود" });
        }

        res.json({ message: "تم حذف المستخدم بنجاح" });
    } catch (error) {
        res.status(500).json({
            message: "فشل في حذف المستخدم",
            error: error.message,
        });
    }
});

module.exports = router;
