import React from 'react'
import Course from "./components/Course"
import HomePage from "./components/HomePage"
import EditCourse from "./components/EditCourse"

import courseService from "./services/courses"
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      courses: [],
      newCourseName: "",
      newCourseCredits: null,
      newCourseLength: null
    }

  }

  reloadCoursesFromBackend() {
    courseService
    .getAll()
    .then(courses => {
      this.setState({ courses })
      console.log("reloaded " + courses.length + " courses from backend.")
    })
  }


  componentDidMount() {
    console.log("getting courses from backend...")
    courseService
      .getAll()
      .then(courses => {
        this.setState({ courses })
        console.log("got " + courses.length + " courses from backend.")
      })
  }

  addCourse = (event) => {
    event.preventDefault()

    const courseObject = {
      title: this.state.newCourseName,
      length: this.state.newCourseLength,
      credits: this.state.newCourseCredits
    }

    let errors = 0


    if (courseObject.title === "") {
      alert("Kurssilla tulee olla nimi!")
      errors++
    }

    if (isNaN(courseObject.length)) {
      alert("Kurssin pituuden tulee olla numero!")
      errors++
    }

    if (isNaN(courseObject.credits)) {
      alert("Kurssin opintopistemäärän tulee olla numero!")
      errors++
    }


    if (errors === 0) {
      courseService
        .create(courseObject)
        .then(response => {
          this.setState({
            courses: this.state.courses.concat(response.data),
            newCourseName: "",
            newCourseCredits: 0,
            newCourseLength: 0
          })
        })
    }
  }

  handleCourseNameChange = (event) => {
    console.log(event.target.value)
    this.setState({ newCourseName: event.target.value })
  }

  handleCourseCreditsChange = (event) => {
    console.log(event.target.value)
    this.setState({ newCourseCredits: event.target.value })
  }

  handleCourseLengthChange = (event) => {
    console.log(event.target.value)
    this.setState({ newCourseLength: event.target.value })
  }

  render() {

    const findCourseById = (id) =>
    this.state.courses.find(course => course._id === id)


    


    return (
      <div>
        <Router>
          <div>
            <div>
              <Link to="/">Etusivu</Link>
              <Link to="/courses">Kurssit</Link>
              </div>

          <Route exact path="/courses" render={() =>
          <div>
            <h1>Kurssit</h1>
          <ul>
            {this.state.courses.map(course => <Course key={course._id} course={course} />)}
          </ul>


          <form onSubmit={this.addCourse}>
            Name:
          <input value={this.state.newCourseName} onChange={this.handleCourseNameChange}/>
            Credits:
          <input value={this.state.newCourseCredits} onChange={this.handleCourseCreditsChange}/>
            Length (in periods):
          <input value={this.state.newCourseLength} onChange={this.handleCourseLengthChange}/>
            <button type="submit">lisää kurssi</button>
          </form>
            </div>
          } />
          

          
          <Route exact path="/" render={() => <HomePage/> } />

          

                <Route exact path="/courses/:id" render={({match}) =>
        <EditCourse state={this.state} course={findCourseById(match.params.id)} />}
      />
          



          </div>
        </Router>
      </div>
    )
  }

}

export default App