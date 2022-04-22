const express = require('express')
const router = express.Router()

const userSchema = require('../models/User')

// Create User
router.post('/create', async (req, res) => {
	const user = userSchema(req.body)
	await user
		.save()
		.then(data => res.json(data))
		.catch(error => res.json({ message: error }))
})

// Get all users
router.get('/index', async (req, res) => {
	await userSchema
		.find()
		.then(data => res.json(data))
		.catch(error => res.json({ message: error }))
})

// Find an user by id
router.get('/index/:id', async (req, res) => {
	const { id } = req.params
	await userSchema
		.findById(id)
		.then(data => res.json(data))
		.catch(error => res.json({ message: error }))
})

// Update an user by id
router.put('/update/:id', async (req, res) => {
	const { id } = req.params
	const { nome, telefone, email, senha } = req.body
	await userSchema
		.updateOne({ _id: id }, { $set: { nome, telefone, email, senha } })
		.then(data => res.json(data))
		.catch(error => res.json({ message: error }))
})

// Delete an user by id
router.delete('/delete/:id', async (req, res) => {
	const { id } = req.params
	await userSchema
		.deleteOne({ _id: id })
		.then(() => res.json({ message: 'Usuario deletado com sucesso' }))
		.catch(error => res.json({ message: error }))
})

module.exports = router
