const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

const coursesRouter = require('./controllers/courses')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const goalsRouter = require('./controllers/goals')

const logger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const error = (request, response) => {
  response.status(404).send({
    error: 'unknown endpoint',
  })
}

app.use(bodyParser.json())
app.use(logger)
app.use(cors())
app.use(express.static('build'))

app.get('/api/', (req, res) => {
  res.send(
    '<p>Tervetuloa backendiin!</p> <a href="/api/courses">/api/courses</a> <a href="/api/users">/api/users</a> <a href="/api/goals">/api/goals</a>'
  )
})

app.get('/courses', (req, res) => {
  res.redirect('/')
})

app.get('/courses/:id', (req, res) => {
  res.redirect('/')
})

app.use('/api/courses', coursesRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/goals', goalsRouter)

app.use(error)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
