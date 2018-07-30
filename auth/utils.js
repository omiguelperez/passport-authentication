'use strict'

const jwt = require('jsonwebtoken')
const config = require('../config')

module.exports = {
  signToken (payload, secret = config.secret, options = {}) {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, secret, options, (err, token) => {
        if (err) return reject(err)
        resolve(token)
      })
    })
  },

  verityToken (token, secret = config.secret, options = {}) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, options, (err, decoded) => {
        if (err) return reject(err)
        resolve(decoded)
      })
    })
  }
}
