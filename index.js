'use strict'

const port = process.env.PORT || 8000

const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const passport = require('passport')
const mongoose = require('mongoose')
const path = require('path')
const http = require('http')
const auth = require('./auth')
const config = require('./config')
const lib = require('./lib')

const app = express()
const server = http.createServer(app)

mongoose.connect('mongodb://localhost/passportauthentication')

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(expressSession({
  secret: config.secret,
  resave: true,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

passport.use(auth.localStrategy)
passport.serializeUser(auth.serializeUser)
passport.deserializeUser(auth.deserializeUser)

app.post('/signup', (req, res) => {
  lib.saveUser(req.body, (err, created) => {
    if (err) return res.status(500).send(err)
    res.status(200).send(created)
  })
})

app.post('/login', passport.authenticate('local', {
  failureRedirect: '/login.html'
}), (req, res) => {
  console.log('login:req.isAuthenticated()', req.isAuthenticated())
  res.redirect('/home')
})

app.get('/home', (req, res) => {
  console.log('home:req.isAuthenticated()', req.isAuthenticated())
  res.sendfile(path.join(__dirname, 'public', 'home.html'))
})

server.on('listening', onListening)

function onListening (err) {
  if (err) console.error(err), process.exit(1)
  console.log(`Server running on port ${port}`)
}

server.listen(port)