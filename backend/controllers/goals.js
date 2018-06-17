const goalsRouter = require("express").Router()
const Goal = require("../models/goal")

const User = require("../models/user")



goalsRouter.get("/", async (request, response) => {
    const goals = await Goal
        .find({})
    response.json(goals)
})


goalsRouter.get("/:id", (request, response) => {
    Goal
        .findById(request.params.id)
        .populate("course")
        .populate("user")
        .then(goal => {
            if (goal) {
                
                response.json(goal)
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


goalsRouter.post("/", async (request, response) => {

    const newGoal = new Goal({
        course: request.body.courseid,
        user: request.body.userid,
        target: request.body.target,
        difficulty: request.body.difficulty
    })


    const user = await User.findById(request.body.userid).populate("goals")


    const result = user.goals.find(goal => goal.course.equals(newGoal.course) && goal.user.equals(newGoal.user))
    console.log("and the result is: " + result)
    
    
    if(result !== undefined){
        console.log("refusing to create new goal!")
        return response.status(204).json({ error: "this user-course combination already exists!"})
    }




    console.log("Creating new goal")

    newGoal
        .save()
        .then(savedGoal => {
            //Uusi tavoite tallennettu, lisätään se userin goals listaan.

            user.goals.push(savedGoal._id)


            User
                .findByIdAndUpdate(request.body.userid, user)
                .then(updatedUser => {
                    console.log("user updated!")
                    response.json(savedGoal)
                })
            
        })

})

goalsRouter.delete("/:id", (request, response) => {
    console.log("Deleting goal...")
    Goal
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

goalsRouter.put("/:id", (request, response) => {
    console.log("---------------------------------------")
    console.log(request.body)
    
    const body = request.body

    

    const updatedGoal = {
        course: body.courseid,
        user: body.userid,
        target: body.target,
        difficulty: body.difficulty
    }

    Goal
        .findByIdAndUpdate(request.params.id, updatedGoal, {
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





module.exports = goalsRouter