require('dotenv').load()

const secret = process.env.AUTH_HASH

module.exports = secret