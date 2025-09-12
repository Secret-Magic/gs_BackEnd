const express = require('express');
const router = express.Router();
const Account = require('../models/Account');

// الحصول على جميع الحسابات
router.get('/', async (req, res) => {
  try {
    const accounts = await Account.find();
    res.json(accounts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// إنشاء حساب جديد
router.post('/', async (req, res) => {
  const account = new Account({
    name: req.body.name,
    type: req.body.type || 'gAccount',
    parent: req.body.parent,
    lvl: req.body.lvl,
    stillActive: req.body.stillActive !== undefined ? req.body.stillActive : true
  });

  try {
    const newAccount = await account.save();
    res.status(201).json(newAccount);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// الحصول على حساب معين بالمعرف
router.get('/:id', getAccount, (req, res) => {
  res.json(res.account);
});

// تحديث حساب
router.patch('/:id', getAccount, async (req, res) => {
  if (req.body.name != null) {
    res.account.name = req.body.name;
  }
  if (req.body.type != null) {
    res.account.type = req.body.type;
  }
  if (req.body.parent != null) {
    res.account.parent = req.body.parent;
  }
  if (req.body.lvl != null) {
    res.account.lvl = req.body.lvl;
  }
  if (req.body.stillActive != null) {
    res.account.stillActive = req.body.stillActive;
  }

  try {
    const updatedAccount = await res.account.save();
    res.json(updatedAccount);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// حذف حساب
router.delete('/:id', getAccount, async (req, res) => {
  try {
    await Account.findByIdAndDelete(res.account._id);
    res.json({ message: 'تم حذف الحساب بنجاح' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// دالة مساعدة للعثور على حساب
async function getAccount(req, res, next) {
  let account;
  try {
    account = await Account.findById(req.params.id);
    if (account == null) {
      return res.status(404).json({ message: 'لا يوجد حساب بهذا المعرف' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.account = account;
  next();
}

module.exports = router;
