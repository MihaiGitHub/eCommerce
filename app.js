const express = require('express')
const mongoose = require('mongoose')
// for dev purpose to view requests in console
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
require('dotenv').config()

// import routes
const userRoutes = require('./routes/user')

// app
const app = express()

// db
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => console.log('DB Connected'))

// middlewares
app.use(morgan('dev'))
app.use(bodyParser.json()) // get json data from request body
app.use(cookieParser()) // store user data in cookie

// use routes as middleware
app.use('/api', userRoutes)

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

