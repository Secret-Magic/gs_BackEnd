const express = require("express");
const router = express.Router();
const Account = require("../models/Account.model");

// الحصول على جميع الحسابات
router.get("/", async (req, res) => {
    try {
        const { accountType, isActive } = req.query;
        let filter = {};

        if (accountType) {
            filter.accountType = accountType;
        }

        if (isActive !== undefined) {
            filter.isActive = isActive === "true";
        }

        const accounts = await Account.find(filter);
        res.json(accounts);
    } catch (error) {
        res.status(500).json({
            message: "حدث خطأ في جلب الحسابات",
            error: error.message,
        });
    }
});

// الحصول على حساب معين حسب المعرف
router.get("/:id", async (req, res) => {
    try {
        const account = await Account.findById(req.params.id);
        if (!account) {
            return res.status(404).json({ message: "الحساب غير موجود" });
        }
        res.json(account);
    } catch (error) {
        res.status(500).json({
            message: "حدث خطأ في جلب الحساب",
            error: error.message,
        });
    }
});

// إنشاء حساب جديد
router.post("/", async (req, res) => {
    try {
        const account = new Account({
            accountType: req.body.accountType,
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            taxNumber: req.body.taxNumber,
            bankAccount: req.body.bankAccount,
            bankName: req.body.bankName,
            contactPerson: req.body.contactPerson,
            creditLimit: req.body.creditLimit,
            currentBalance: req.body.currentBalance,
            notes: req.body.notes,
        });

        const savedAccount = await account.save();
        res.status(201).json(savedAccount);
    } catch (error) {
        res.status(400).json({
            message: "فشل في إنشاء الحساب",
            error: error.message,
        });
    }
});

// تحديث حساب
router.put("/:id", async (req, res) => {
    try {
        const account = await Account.findByIdAndUpdate(
            req.params.id,
            {
                accountType: req.body.accountType,
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                address: req.body.address,
                taxNumber: req.body.taxNumber,
                bankAccount: req.body.bankAccount,
                bankName: req.body.bankName,
                contactPerson: req.body.contactPerson,
                creditLimit: req.body.creditLimit,
                currentBalance: req.body.currentBalance,
                notes: req.body.notes,
                isActive: req.body.isActive,
            },
            { new: true, runValidators: true }
        );

        if (!account) {
            return res.status(404).json({ message: "الحساب غير موجود" });
        }

        res.json(account);
    } catch (error) {
        res.status(400).json({
            message: "فشل في تحديث الحساب",
            error: error.message,
        });
    }
});

// حذف حساب (تغيير الحالة إلى غير نشط)
router.delete("/:id", async (req, res) => {
    try {
        const account = await Account.findByIdAndUpdate(
            req.params.id,
            { isActive: false },
            { new: true }
        );

        if (!account) {
            return res.status(404).json({ message: "الحساب غير موجود" });
        }

        res.json({ message: "تم حذف الحساب بنجاح" });
    } catch (error) {
        res.status(500).json({
            message: "فشل في حذف الحساب",
            error: error.message,
        });
    }
});

// تحديث رصيد الحساب
router.put("/:id/balance", async (req, res) => {
    try {
        const { amount, operation } = req.body;

        if (!amount || !["add", "subtract"].includes(operation)) {
            return res.status(400).json({ message: "المعلمات غير صالحة" });
        }

        const account = await Account.findById(req.params.id);

        if (!account) {
            return res.status(404).json({ message: "الحساب غير موجود" });
        }

        let newBalance;
        if (operation === "add") {
            newBalance = account.currentBalance + amount;
        } else {
            newBalance = account.currentBalance - amount;
        }

        const updatedAccount = await Account.findByIdAndUpdate(
            req.params.id,
            { currentBalance: newBalance },
            { new: true }
        );

        res.json(updatedAccount);
    } catch (error) {
        res.status(500).json({
            message: "فشل في تحديث رصيد الحساب",
            error: error.message,
        });
    }
});

module.exports = router;
