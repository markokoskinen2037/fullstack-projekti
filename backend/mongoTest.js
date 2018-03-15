const mongoose = require('mongoose')

// korvaa url oman tietokantasi urlilla. ethän laita salasanaa Gothubiin!
const url = "mongodb://admin:feikkisalasana@ds115198.mlab.com:15198/fullstackprojekti"

mongoose.connect(url)

const Course = mongoose.model('Course', {
    title: String,
    credits: Number,
    length: Number
})

const course = new Course({
    title: "mongoosetest",
    credits: 0,
    length: 0
})

course
  .save()
  .then(response => {
    console.log('course saved saved!')
    mongoose.connection.close()
  })