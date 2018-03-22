const mongoose = require("mongoose")

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}


const url = process.env.MONGODB_URI


mongoose.connect(url)

const Course = mongoose.model("Course", {
    title: String,
    credits: Number,
    length: Number
})

module.exports = Course