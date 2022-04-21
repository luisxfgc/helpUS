const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
	nome: {
		type: String,
		required: true,
	},
	telefone: {
		type: String,
		required: true,
	},
	email: {
		type: String,
	},
	senha: {
		type: String,
		required: true,
		selected: false,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
})

module.exports = mongoose.model('User', userSchema)
