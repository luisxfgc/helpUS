const userSchema = require('../models/User')

exports.registerUser = async (req, res) => {
	const user = await userSchema(req.body)
	user
		.save()
		.then(data => res.json(data))
		.catch(error => res.json({ message: error }))
}

exports.getAllUsers = (req, res) => {
	userSchema
		.find()
		.then(data => res.json(data))
		.catch(error => res.json({ message: error }))
}

exports.getUserById = (req, res) => {
	const { id } = req.params
	userSchema
		.findById(id)
		.then(data => res.json(data))
		.catch(error => res.json({ message: error }))
}

exports.updateUser = async (req, res) => {
	const { id } = req.params
	const { name, phone, email, password } = req.body
	await userSchema
		.updateOne({ _id: id }, { $set: { name, phone, email, password } })
		.then(data => res.json(data))
		.catch(error => res.json({ message: error }))
}

exports.deleteUser = async (req, res) => {
	const { id } = req.params
	await userSchema
		.deleteOne({ _id: id })
		.then(() => res.json({ message: 'Usuario deletado com sucesso' }))
		.catch(error => res.json({ message: error }))
}
