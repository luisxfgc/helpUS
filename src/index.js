const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const app = express()

const userRoutes = require('./routes/userRouter')

// Middlewares
app.use(express.json())
app.use('/api', userRoutes)

mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => {
		console.log('Connected to database!')
		app.listen(3000)
	})
	.catch(err => {
		console.error(err)
	})
