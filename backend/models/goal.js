const mongoose = require("mongoose")

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}


const url = process.env.MONGODB_URI



mongoose.connect(url)

const Goal = mongoose.model("Goal", {
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    target: Number,
    difficulty: String
})

module.exports = Goal