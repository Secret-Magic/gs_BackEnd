const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// تسجيل مستخدم جديد
router.post("/register", async (req, res) => {
    try {
        const { username, password, role } = req.body;
        const user = await User.create({ username, password, role });
        res.status(201).json({ message: "تم التسجيل بنجاح" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// تسجيل الدخول
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res
                .status(400)
                .json({ message: "اسم المستخدم أو كلمة المرور غير صحيحة" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res
                .status(400)
                .json({ message: "اسم المستخدم أو كلمة المرور غير صحيحة" });
        }
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
