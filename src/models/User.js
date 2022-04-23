const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
	name: {
		type: String,
		unique: true,
		required: true,
	},
	phone: {
		type: String,
		unique: true,
		required: true,
	},
	email: {
		type: String,
		unique: true,
		lowercase: true,
	},
	password: {
		type: String,
		required: true,
		selected: false,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
})

userSchema.pre('save', async function (next) {
	const hash = await bcrypt.hash(this.password, 10)
	this.password = hash
	next()
})

module.exports = mongoose.model('User', userSchema)
