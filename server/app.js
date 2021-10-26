require('dotenv').config()
const express = require('express')
const app = express()
const PORT = 4000

const errorHandler = require('./middlewares/errorHandler')
const cors = require('cors')
const router = require('./routes/index')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(router)
app.use(errorHandler)

module.exports = app