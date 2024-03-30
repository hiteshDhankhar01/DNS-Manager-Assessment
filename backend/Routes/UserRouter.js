const express = require('express')
const { register, login, deleteUser } = require('../Controllers/UserController')
const { protect } = require('../Middleware/auth')

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.delete('/delete/:id', protect, deleteUser)

module.exports = router