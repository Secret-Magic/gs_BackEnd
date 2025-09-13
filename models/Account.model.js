const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
	accountType: {
		type: String,
		required: true,
		enum: ["موظف", "عميل", "مورد", "مخزن", "مدير", "مالي"],
	},
	name: {
		type: String,
		required: true,
		trim: true,
		maxlength: 100,
	},
	email: {
		type: String,
		trim: true,
		lowercase: true,
		sparse: true, // يمكن أن يكون null
	},
	phone: {
		type: String,
		required: true,
		trim: true,
	},
	address: {
		type: String,
		trim: true,
		maxlength: 200,
	},
	taxNumber: {
		type: String,
		trim: true,
		sparse: true, // يمكن أن يكون null
	},
	bankAccount: {
		type: String,
		trim: true,
		sparse: true, // يمكن أن يكون null
	},
	bankName: {
		type: String,
		trim: true,
		sparse: true, // يمكن أن يكون null
	},
	contactPerson: {
		name: {
			type: String,
			trim: true,
			maxlength: 100,
		},
		phone: {
			type: String,
			trim: true,
		},
		email: {
			type: String,
			trim: true,
			lowercase: true,
		},
	},
	creditLimit: {
		type: Number,
		default: 0,
		min: 0,
	},
	currentBalance: {
		type: Number,
		default: 0,
	},
	notes: {
		type: String,
		trim: true,
		maxlength: 500,
	},
	isActive: {
		type: Boolean,
		default: true,
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
accountSchema.pre("save", function (next) {
	this.updatedAt = new Date();
	next();
});

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
