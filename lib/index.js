'use strict'

const co = require('co')
const User = require('./model')
const utils = require('./utils')
const Promise = require('bluebird')

module.exports = {
  getUser (username, callback) {
    let tasks = co.wrap(function * () {
      let user = yield User.findOne({ username })
      return user
    })

    return Promise.resolve(tasks()).asCallback(callback)
  },

  authenticate (username, password, callback) {
    let tasks = co.wrap(function * () {
      password = utils.encrypt(password)

      let user = yield User.findOne({ username, password })
      return user !== null
    })

    return Promise.resolve(tasks()).asCallback(callback)
  },

  saveUser (user, callback) {
    let tasks = co.wrap(function * () {
      let newUser = new User()

      newUser.name = user.name
      newUser.username = user.username
      newUser.password = utils.encrypt(user.password)

      yield newUser.save()
      return newUser.toJSON()
    })

    return Promise.resolve(tasks()).asCallback(callback)
  }
}