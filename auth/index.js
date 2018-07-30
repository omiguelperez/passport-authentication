'use strict'

const LocalStrategy = require('passport-local').Strategy
const lib = require('../lib')

exports.localStrategy = new LocalStrategy((username, password, done) => {
  lib.authenticate(username, password, (err, token) => {
    if (err) return done(null, false, { error: 'username or password not found' })

    lib.getUser(username, (err, usr) => {
      if (err) return done(null, false, { error: `an error ocurred: ${err.message}`})

      usr.token = token
      console.log('localStrategy:usr', usr)
      done(null, usr)
    })
  })
})

exports.serializeUser = function (user, done) {
  done(null, {
    username: user.username,
    token: user.token
  })
}

exports.deserializeUser = function (user, done) {
  lib.getUser(user.username, (err, usr) => {
    if (err) return done(err)

    usr.token = user.token
    console.log('deserializeUser:usr', usr)
    done(null, usr)
  })
}
