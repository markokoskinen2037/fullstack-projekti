const mongoose = require('mongoose')

const User = mongoose.model('User', {
  username: String,
  name: String,
  passwordHash: String,
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
})

module.exports = User