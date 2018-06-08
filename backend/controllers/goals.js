const goalsRouter = require("express").Router()
const Goal = require("../models/goal")

const User = require("../models/user")



goalsRouter.get("/", async (request, response) => {
    const goals = await Goal
        .find({})
        .populate("user")
        .populate("course")

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

    const goal = new Goal({
        course: request.body.courseid,
        user: request.body.userid,
        target: request.body.target
    })

    //TODO Lisää tarkistus, jos on jo kurssilla ja käyttäjällä yhteinen tavoite, päivitä se.


    const goalsInDB = await Goal.find({})


    

    goalsInDB.forEach(goal => {
        console.log(goal.course + "    " + request.body.courseid)
        if(goal.course.equals(request.body.courseid)){
            console.log("its already here!!!!!!!!!!")
        }
    })




    goal
        .save()
        .then(savedGoal => {
            //Uusi goal on nyt tietokannassa, sit pitää lisätä User:ille uus goal



            User
                .findById(request.body.userid)
                .then(foundUser => {

                    let oldGoals = foundUser.goals

                    //TODO Jos oldGoals listalla on saman kurssin kohdalla goal asetettu, ylikirjoitetaan.

                    const newGoals = oldGoals.concat(savedGoal._id) 

                    console.log(newGoals)

                

                    const test = {
                        goals : newGoals
                    }
        
                    User
                        .findByIdAndUpdate(request.body.userid, test, {new:true}) //Päivitetään user
                        .then(response.json(savedGoal))





                })




            
        })

    

    





})





module.exports = goalsRouter