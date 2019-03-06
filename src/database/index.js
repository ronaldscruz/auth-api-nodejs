const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/login-api")
mongoose.Promise = global.Promise

module.exports = mongoose