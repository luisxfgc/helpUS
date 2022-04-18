const express = require('express')
const app = express()
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
	res.send('hello')
})

app.listen(3000)
