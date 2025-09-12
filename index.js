// استيراد المكتبات اللازمة
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// استيراد إعدادات الخادم
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Connect to MongoDB باستخدام متغير البيئة
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

// Basic route
app.get('/', (req, res) => {
  res.send('Welcome to GasStation Backend API');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});
