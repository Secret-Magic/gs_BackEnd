// استيراد المكتبات اللازمة
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");



// إنشاء تطبيق Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());

// يسمح للخادم بفهم بيانات JSON
app.use(express.json()); 

// الاتصال بقاعدة البيانات
mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Could not connect to MongoDB", err));

// استيراد المسارات
const authRoutes = require('./routes/auth'); // استدعاء مسار الـ authentication
const productRouter = require("./routes/products.routes");
const accountsRouter = require("./routes/accounts.routes");
const unitsRouter = require("./routes/units.routes");
// const usersRouter = require("./routes/users.routes");
const pumpsRouter = require("./routes/pumps.routes");
const tanksRouter = require("./routes/tanks.routes");
const shiftsRouter = require("./routes/shifts.routes");


// استخدام المسارات
app.use("/api/products", productRouter);
app.use("/api/accounts", accountsRouter);
app.use("/api/units", unitsRouter);
app.use("/api/auth", authRoutes); 
// app.use("/api/users", usersRouter);
app.use("/api/pumps", pumpsRouter);
app.use("/api/tanks", tanksRouter);
app.use("/api/shifts", shiftsRouter);


// مسار رئيسي
app.get("/", (req, res) => {
    res.send("Welcome to GasStation Backend API");
});

// بدء تشغيل الخادم
app.listen(PORT, () => {
    console.log(
        `Server is running on port ${PORT} in ${process.env.NODE_ENV} mode`
    );
});

// تصدير التطبيق والمنفذ للاستخدام في ملفات أخرى
module.exports = { app, PORT };
