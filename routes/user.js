const express = require('express')

// invoke Express router
const router = express.Router()

// routes
router.get('/api', (req, res) => {
    res.send('Hello from node')
})

module.exports = router