const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')



const logger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

const error = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(bodyParser.json())
app.use(logger)
app.use(cors())
app.use(express.static('build'))


let courses = [
    {
        id: 1,
        title: "Johdatus yliopistomatematiikkaan"
    },
    {
        id: 2,
        title: "Tilastotiede ja R tutuksi I"
    }
]





app.get('/', (req, res) => {
    res.send('<p>tervetuloa backendiin</p> <a href="/api/courses">/api/courses</p>')
})

app.get('/api/courses', (req, res) => {
    res.json(courses)
})

app.get('/api/courses/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id)
    const course = courses.find(course => course.id === id)

    if (course) {
        response.json(course)
    } else {
        response.status(404).end()
    }
})

app.delete("/api/courses/:id", (request, response) => {
    const id = Number(request.params.id)
    courses = courses.filter(course => course.id !== id)

    response.status(204).end()
})

app.post('/api/courses/', (request, response) => {
    const maxId = courses.length > 0 ? courses.map(n => n.id).sort().reverse()[0] : 0
    const course = request.body
    course.id = maxId + 1

    courses = courses.concat(course)

    response.json(course)
})



app.use(error)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
