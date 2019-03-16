const express = require('express')
const router = express.Router()

const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const mailer = require('../modules/mailer')
const authConfig = require('../../config/auth')

const User = require('../models/User')

function generateToken( params = {}){
   return jwt.sign(params, authConfig, {
      expiresIn: 33200
   })
}

router.post("/register", async(req, res) => {
   const {email} = req.body

   try{
      if (await User.findOne({ email }))
         return res.status(400).send({error: "This e-mail already exists on our databases."})

      const newUser = await User.create(req.body)

      newUser.password = undefined

      return res.send({
         newUser, 
         token: generateToken( { id: newUser.id } )
      })
   }catch(err){
      return res.status(400).send({error: "Registration failed."})
   }
})

router.post("/authenticate", async(req, res) => {
   const { email, password } = req.body

   const user = await User.findOne({ email }).select("+password")

   if (!user)
      return res.status(400).send({error: "Invalid username."})

   if (!await bcrypt.compare(password, user.password))
      return res.status(400).send({error: "Invalid password."})

   user.password = undefined

   return res.send({
      user, 
      token: generateToken( { id: user.id })
   })
})

router.post('/forgot_password', async(req, res) => {
   const {email} = req.body

   try{
      const user = await User.findOne({email})

      if (!user)
         return res.status(400).send({error: "Invalid username."})

      const token = crypto.randomBytes(15).toString('hex')

      const now = new Date()
      now.setMinutes(now.getMinutes() + 15)

      await User.findByIdAndUpdate(user.id, {
         '$set': {
            'passwordResetToken': token,
            'passwordResetExpires': now
         }
      })

      mailer.sendMail({
         to: email,
         from: 'ronald@fastcoding.com',
         template: '/auth/forgot_password',
         context: { token }
      }, (err) => {
         if(err)
            return res.status(400).send({error: 'Failed to send recovery token! :('})
         return res.send({ok: 'Your token to redefine your password was sent!'})
      })

      console.log(token, now)
   }catch(err){
      res.status(400).send({error: "Password recovery failed"})
      console.log(err)
   }
})

router.post('/reset_password', async(req, res) => {
   const { email, token, password } = req.body
   // const password = req.params.token

   try{
      const user = await User.findOne({email})
         .select("+passwordResetToken passwordResetExpires")

      if (!user)
         return res.status(400).send({error:"Invalid username."})

      if (token !== user.passwordResetToken)
         return res.status(400).send({error: 'Invalid token.'})

      const now = new Date()
      if (now > user.passwordResetExpires)
         return res.status(400).send({error: 'This token has expired. Generate a new one'})

      user.password = password
      user.passwordResetToken = undefined
      user.passwordResetExpires = undefined

      await user.save()

      return res.send({ok: "Password change successful! Now you can use your new credentials"})
   }catch(err){
      res.status(400).send({error: 'Failed to reset password :('})
   }
})

module.exports = app => app.use("/auth", router)