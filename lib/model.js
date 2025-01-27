'use strict'

const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema({
  name: String,
  username: String,
  password: String
})

module.exports = mongoose.model('users', UserSchema)
