const mongoose = require('mongoose')

try{
   mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useCreateIndex: true})
   mongoose.Promise = global.Promise
}catch(err){
   console.log(err)
}

module.exports = mongoose