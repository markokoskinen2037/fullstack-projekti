const coursesRouter = require("express").Router()
const Course = require("../models/course")



coursesRouter.get("/", async (request, response) => {
    const courses = await Course
        .find({})
        .populate("user")

    response.json(courses)
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
            response.status(400).send({
                error: "malformatted id"
            })
        })
})

coursesRouter.delete("/:id", (request, response) => {
    Course
        .findByIdAndRemove(request.params.id)
        .then(() => {
            response.status(204).end()
        })
        .catch(error => {
            response.status(400).send({
                error: "malformatted id"
            })
        })
})

coursesRouter.put("/:id", (request, response) => {
    console.log("---------------------------------------")
    console.log(request.body)
    
    const body = request.body

    const course = {
        title: body.title,
        credits: body.credits,
        length: body.length
    }

    Course
        .findByIdAndUpdate(request.params.id, course, {
            new: true
        })
        .then(updatedCourse => {
            response.json(updatedCourse)
        })
        .catch(error => {
            console.log(error)
            response.status(400).send({
                error: "malformatted id"
            })
        })
})

coursesRouter.post("/", async (request, response) => {


    if (request.body.title === undefined) {
        return response.status(400).json({
            error: "Title required!"
        })
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
        length: request.body.length,
        user: request.body.userId
    })

    course
        .save()
        .then(savedCourse => {
            response.json(savedCourse)
        })

})



module.exports = coursesRouter