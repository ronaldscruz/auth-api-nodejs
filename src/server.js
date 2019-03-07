require('dotenv').load()

const express = require('express')
const cors = require("cors")
const bodyParser = require('body-parser')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

require('./app/controllers/authController')(app)
require('./app/controllers/panelController')(app)

app.listen(process.env.PORT)



