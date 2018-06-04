const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")


const coursesRouter = require("./controllers/courses")
const usersRouter = require("./controllers/users")
const loginRouter = require('./controllers/login')


const logger = (request, response, next) => {
    console.log("Method:", request.method)
    console.log("Path:  ", request.path)
    console.log("Body:  ", request.body)
    console.log("---")
    next()
}

const error = (request, response) => {
    response.status(404).send({
        error: "unknown endpoint"
    })
}


app.use(bodyParser.json())
app.use(logger)
app.use(cors())
app.use(express.static("build"))


app.get("/api/", (req, res) => {
    res.send("<p>Tervetuloa backendiin!</p> <a href=\"/api/courses\">/api/courses</p> <a href=\"/api/users\">/api/users</p>")
})

app.use("/api/courses", coursesRouter)
app.use("/api/users", usersRouter)
app.use("/api/login", loginRouter)

app.use(error)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})