const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const Course = require("./models/course")




const logger = (request, response, next) => {
    console.log("Method:", request.method)
    console.log("Path:  ", request.path)
    console.log("Body:  ", request.body)
    console.log("---")
    next()
}

const error = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" })
}


app.use(bodyParser.json())
app.use(logger)
app.use(cors())
app.use(express.static("build"))



app.get("/api/", (req, res) => {
    res.send("<p>tervetuloa backendiiiiin</p> <a href=\"/api/courses\">/api/courses</p>")
})

app.get("/api/courses", (request, response) => {
    Course
        .find({})
        .then(courses => {
            response.json(courses)
        })
})

app.get("/api/courses/:id", (request, response) => {
    Course
        .findById(request.params.id)
        .then(course => {
            if (course) {
                response.json(course)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => {
            console.log(error)
            response.status(400).send({ error: "malformatted id" })
        })
})

app.delete("/api/courses/:id", (request, response) => {
    Course
        .findByIdAndRemove(request.params.id)
        .then((result) => {
            response.status(204).end()
        })
        .catch(error => {
            response.status(400).send({ error: "malformatted id" })
        })
})

app.put("/api/courses/:id", (request, response) => {
    const body = request.body

    const course = {
        title: body.title,
        credits: body.credits,
        length: body.length
    }

    Course
        .findByIdAndUpdate(request.params.id, course, { new: true })
        .then(updatedCourse => {
            response.json(updatedCourse)
        })
        .catch(error => {
            console.log(error)
            response.status(400).send({ error: "malformatted id" })
        })
})

app.post("/api/courses/", (request, response) => {

    if (request.body.title === undefined) {
        return response.status(400).json({ error: "Title required!" })
    }

    if (request.body.credits === undefined) {
        request.body.credits = 0
    }

    if (request.body.length === undefined) {
        request.body.length = 0
    }




    const course = new Course({
        title: request.body.title,
        credits: request.body.credits,
        length: request.body.length
    })

    course
        .save()
        .then(savedCourse => {
            response.json(savedCourse)
        })
})



app.use(error)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
