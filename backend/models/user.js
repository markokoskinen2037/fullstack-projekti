const mongoose = require("mongoose")

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}


const url = process.env.MONGODB_URI

const User = mongoose.model('User', {
  username: String,
  name: String,
  passwordHash: String,
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
})

module.exports = User