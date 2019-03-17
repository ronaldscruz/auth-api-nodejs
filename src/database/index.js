const mongoose = require('mongoose')

try{
   mongoose.connect(process.env.DB_CONNECT)
   mongoose.Promise = global.Promise
   console.log('> Database OK!')
}catch(err){
   console.log('ERROR: Database: '+err)
}


module.exports = mongoose