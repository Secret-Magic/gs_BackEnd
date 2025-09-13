const mongoose = require("mongoose");

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
userSchema.pre("save", function (next) {
	this.updatedAt = new Date();
	next();
});

module.exports = mongoose.model("User", userSchema);

module.exports = User;