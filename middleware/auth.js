const jwt = require("jsonwebtoken");
const User = require("../models/User");

// التحقق من رمز JWT
const verifyToken = (req, res, next) => {
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token) {
        return res.status(401).send("غير مصرح بالدخول");
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (e) {
        res.status(401).send("الرمز غير صالح");
    }
};

// التحقق من صلاحية المدير
const isManager = (req, res, next) => {
    if (req.user.role !== "مدير") {
        return res.status(403).send("ليس لديك الصلاحية الكافية");
    }
    next();
};

module.exports = {
    verifyToken,
    isManager,
};
