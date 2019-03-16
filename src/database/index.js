const mongoose = require('mongoose')

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useCreateIndex: true})
mongoose.Promise = global.Promise

module.exports = mongoose