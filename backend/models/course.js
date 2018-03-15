const mongoose = require('mongoose')

const url = "mongodb://admin:feikkisalasana@ds115198.mlab.com:15198/fullstackprojekti"

mongoose.connect(url)

const Course = mongoose.model('Course', {
    title: String,
    credits: Number,
    length: Number
})

module.exports = Course