const express = require('express')

// invoke Express router
const router = express.Router()

const { userMain } = require('../controllers/user')

// routes
router.get('/', userMain)

module.exports = router