const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const passport = require('passport')
const session = require('express-session')
const MySqlStore = require('express-mysql-session')(session)

const app = express()

// load .env config file into env
require('dotenv').config()
// init bodyParser
app.use(bodyParser.urlencoded({extended: false}))
// init auth
require('./authentication').init(app)
// configure session to be stored inside MySQL
app.use(session({
  store: new MySqlStore({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME
//    , createDatabaseTable: true
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
// init passport session manager
app.use(passport.initialize())
app.use(passport.session())
// init express-handlebars integration
app.engine('.hbs', exphbs({
  defaultLayout: 'layout',
  extname: '.hbs',
  layoutsDir: path.join(__dirname),
  partialsDir: path.join(__dirname)
}))

app.set('view engine', '.hbs')
app.set('views', path.join(__dirname))
// expose static content folder
app.use('/', express.static('public'))
// init modules
require('./user').init(app)
require('./note').init(app)

module.exports = app
