const express = require('express')
const router = express.Router()

const userSchema = require('../models/User')

// Create User
router.post('/users/create', (req, res) => {
	const user = userSchema(req.body)
	user
		.save()
		.then(data => res.json(data))
		.catch(error => res.json({ message: error }))
})

// Get all users
router.get('/users', (req, res) => {
	userSchema
		.find()
		.then(data => res.json(data))
		.catch(error => res.json({ message: error }))
})

// Find an user by id
router.get('/users/update/:id', (req, res) => {
	const { id } = req.params
	userSchema
		.findById(id)
		.then(data => res.json(data))
		.catch(error => res.json({ message: error }))
})

// Update an user by id
router.put('/users/update/:id', (req, res) => {
	const { id } = req.params
	const { nome, telefone, email, senha } = req.body
	userSchema
		.updateOne({ _id: id }, { $set: { nome, telefone, email, senha } })
		.then(data => res.json(data))
		.catch(error => res.json({ message: error }))
})

// Delete an user by id
router.delete('/users/:id', (req, res) => {
	const { id } = req.params
	userSchema
		.deleteOne({ _id: id })
		.then(() => res.json({ message: 'Usuario deletado com sucesso' }))
		.catch(error => res.json({ message: error }))
})

module.exports = router
