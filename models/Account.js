const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['company', 'branch', 'department', 'employee', 'customer', 'supplier', 'gAccount'],
    default: 'gAccount'
  },
  parent: {
    type: String,
    default: null
  },
  lvl: {
    type: Number,
    required: true,
    default: 0
  },
  stillActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// تحديث تاريخ التعديل قبل الحفظ
accountSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
