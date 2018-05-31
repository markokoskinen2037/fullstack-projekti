const coursesRouter = require('express').Router()
const Course = require("../models/course")


coursesRouter.get("/", (request, response) => {
    Course
        .find({})
        .then(courses => {
            response.json(courses)
        })
})

coursesRouter.get("/:id", (request, response) => {
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

coursesRouter.delete("/:id", (request, response) => {
    Course
        .findByIdAndRemove(request.params.id)
        .then((result) => {
            response.status(204).end()
        })
        .catch(error => {
            response.status(400).send({ error: "malformatted id" })
        })
})

coursesRouter.put("/:id", (request, response) => {
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

coursesRouter.post("/", (request, response) => {

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



module.exports = coursesRouter