const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["مدير", "عامل وردية", "عامل غسيل"],
        required: true,
    },
    stationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Station",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});


// تحديث التاريخ عند التعديل
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        this.updatedAt = new Date();
        return next();
    }
    // تشفير كلمة المرور قبل حفظها
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});


module.exports = mongoose.model("User", userSchema);
