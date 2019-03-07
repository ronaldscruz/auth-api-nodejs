const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth')

module.exports = (req, res, next) => {
   const authHeader = req.headers.authorization

   if (!authHeader)
      return res.status(401).send({error: "Unauthorized (no token provided)"})

   const parts = authHeader.split(' ')

   if(!parts.length === 2)
      return res.status(401).send({error: "Invalid session token"})

   const [ scheme, token ] = parts

   if(!/^Bearer/i.test(scheme))
      return res.status(401).send({error: "Malformed token"})
   
   jwt.verify(token, authConfig, (err, decoded) => {
      if(err) return res.status(401).send({error: "Invalid session token"})

      req.userId = decoded.id

      return next()
   })
}