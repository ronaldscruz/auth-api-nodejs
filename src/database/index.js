const mongoose = require('mongoose')

mongoose.connect(process.env.DB_CONNECT)
mongoose.Promise = global.Promise

module.exports = mongoose