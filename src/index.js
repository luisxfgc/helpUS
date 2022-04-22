const express = require('express')
const app = express()

const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv').config()

const userRoutes = require('./routes/userRouter')

// Middlewares
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/api/users', userRoutes)

// MongoDB connection by mongoose
mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => {
		console.log('Connected to database!')
		app.listen(3000, () => {
			console.log('Server is running on port 3000')
		})
	})
	.catch(err => {
		console.error(err)
	})
