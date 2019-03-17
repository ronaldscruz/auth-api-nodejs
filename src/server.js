const express = require('express')
const cors = require("cors")
const bodyParser = require('body-parser')

const app = express()

require('dotenv').config()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

require('./app/controllers/index')(app)

const port = process.env.PORT || 3003
app.listen(port, () => {
   console.log('> Running on port '+port)
})



