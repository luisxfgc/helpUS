const express = require('express')
const mongoose = require('mongoose')
const app = express()

const User = require('./models/User')

app.use(express.urlencoded({ extended: true }))

app.post('/create', async (req, res) => {
	/*
	 * POST /users/create
	 * Rota usada para cadastrar um novo usuário
	 */
	const { nome, telefone, email, senha } = req.body

	if (!nome) {
		res.status(422).json({ error: 'Preencha todos os campos' })
	}

	const user = {
		nome,
		telefone,
		email,
		senha,
	}
	try {
		await User.create(user)
		console.log('Usuário cadastrado com sucesso')
	} catch (error) {
		console.log(error)
	}
})

app.get('/', (req, res) => {
	res.json({ message: 'Hello World!' })
})

const DB_USER = 'root'
const DB_PASSWORD = encodeURIComponent('root')

mongoose
	.connect(
		`mongodb+srv://${DB_USER}:${DB_PASSWORD}@clusterhelpus.p8jnc.mongodb.net/helpUS_db?retryWrites=true&w=majority`
	)
	.then(() => {
		console.log('Connected to database!')
		app.listen(3000)
	})
	.catch(err => {
		console.log(err)
	})
