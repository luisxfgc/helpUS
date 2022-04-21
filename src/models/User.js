const mongoose = require('mongoose')

const User = mongoose.model('User', {
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
		unique: true,
	},
	senha: {
		type: String,
		select: false,
		required: true,
	},
})

module.exports = User
