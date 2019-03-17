const path = require('path')
const mailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')

const transport = mailer.createTransport({
   host: process.env.MAILER_HOST,
   port: process.env.MAILER_PORT,
   auth: {
     user: process.env.MAILER_USER,
     pass: process.env.MAILER_PASS,
   }
});

transport.use('compile', hbs({
   viewEngine: {
      extname: '.hbs',
      partialsDir: path.resolve('../resources/mail/partials')
   },
   viewPath: path.resolve('./src/resources/mail'),
   extName: '.hbs'
}))

console.log('> Mailer loaded')

module.exports = transport