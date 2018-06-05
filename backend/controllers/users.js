const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
    try {
        const body = request.body

        const existingUser = await User.find({
            username: body.username
        })
        if (existingUser.length > 0) {
            return response.status(400).json({
                error: 'username must be unique'
            })
        }

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = new User({
            username: body.username,
            name: body.name,
            email: body.email,
            passwordHash
        })

        const savedUser = await user.save()

        response.json(savedUser)
    } catch (exception) {
        console.log(exception)
        response.status(500).json({
            error: 'something went wrong...'
        })
    }
})



usersRouter.get('/', async (request, response) => {
    const users = await User
      .find({})
      .populate('courses')
  
    response.json(users)
  })

usersRouter.get("/:id", (request, response) => {
    User
        .findById(request.params.id)
        .then(user => {
            if (user) {
                response.json(user)
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

usersRouter.put("/:id", (request, response) => {
    const body = request.body

    console.log("hello?")
    console.log(body.oldActiveCourses)
    console.log(body.course)
    

    const user = {
        activeCourses: body.course
    }

    User
        .findByIdAndUpdate(request.params.id, user, {
            new: true
        })
        .then(updatedUser => {
            response.json(updatedUser)
        })
        .catch(error => {
            console.log(error)
            response.status(400).send({
                error: "malformatted id"
            })
        })
})

module.exports = usersRouter