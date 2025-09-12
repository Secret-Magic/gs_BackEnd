// استيراد المكتبات اللازمة
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// إنشاء تطبيق Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// الاتصال بقاعدة البيانات
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

// استيراد المسارات
const accountsRouter = require('./routes/accounts');

// استخدام المسارات
app.use('/api/accounts', accountsRouter);

// مسار رئيسي
app.get('/', (req, res) => {
  res.send('Welcome to GasStation Backend API');
});

// بدء تشغيل الخادم
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});

// تصدير التطبيق والمنفذ للاستخدام في ملفات أخرى
module.exports = { app, PORT };
