const mongoose = require('mongoose')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const url = process.env.MONGODB_URI

mongoose.connect(url)

const User = mongoose.model('User', {
  username: String,
  name: String,
  passwordHash: String,
  activeCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  email: String,
  goals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Goal' }],
})

module.exports = User
