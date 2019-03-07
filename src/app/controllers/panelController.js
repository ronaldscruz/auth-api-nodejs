const express = require('express')
const router = express.Router()
const authMiddlware = require('../middlewares/auth')

router.use(authMiddlware)

router.get('/', (req, res) => {
   return res.send('hello boyz')
})

module.exports = app => app.use("/panel", router)