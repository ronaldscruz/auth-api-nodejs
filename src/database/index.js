const mongoose = require('mongoose')

try{
   mongoose.connect(process.env.MONGODB_URI)
   mongoose.Promise = global.Promise
   console.log('> Database OK!')
}catch(err){
   console.log('ERROR: Database: '+err)
}


module.exports = mongoose