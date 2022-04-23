const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')

router.post('/register', userController.registerUser)
router.get('/index', userController.getAllUsers)
router.get('/index/:id', userController.getUserById)
router.put('/update/:id', userController.updateUser)
router.delete('/delete/:id', userController.deleteUser)

module.exports = router
