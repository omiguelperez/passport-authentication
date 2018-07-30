'use strict'

const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const config = require('../config')

const utils = {
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
  },

  encrypt (password) {
    let shasum = crypto.createHash('sha256')
    shasum.update(password)
    return shasum.digest('hex')
  }
}

module.exports = utils
