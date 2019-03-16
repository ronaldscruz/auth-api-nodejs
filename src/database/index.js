const mongoose = require('mongoose')

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useCreateIndex: true, useMongoClient: true })
mongoose.Promise = global.Promise

module.exports = mongoose