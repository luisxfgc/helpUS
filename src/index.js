const express = require('express')
const app = express()

const mongoose = require('mongoose')
require('dotenv').config()

const cors = require('cors')

const userRoutes = require('./routes/userRouter')

// Middlewares
app.use(cors())
app.use(express.json())
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
