import React from 'react'
import Course from "./components/Course"
import HomePage from "./components/HomePage"
import EditCourse from "./components/EditCourse"
import LoginForm from "./components/LoginForm"

import courseService from "./services/courses"
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      courses: [],
      newCourseName: "",
      newCourseCredits: "",
      newCourseLength: "",
      user: null
    }

  }

  setLoggedInUser = (user) => {
    this.setState({
      user: user
    })
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


  handleFormChange(event){
    console.log(event.target.value)
    const name = event.target.name
    this.setState({
        [name] : event.target.value
    })
}


  findCourse = (id) => {
    let course = this.state.courses.find(course => course._id === id)
    return course
  }


  render() {
    return (
      <div>
        <Router>
          <div>
            <div>
              <Link to="/">Etusivu</Link>
              <Link to="/courses">Kurssit</Link>
              </div>

              <LoginForm setLoggedInUser={this.setLoggedInUser}/>

          

          <Route exact path="/courses" render={() =>
            <div>
              <h1>Kurssit</h1>
            <ul>
              {this.state.courses.map(course => <Course reloadCoursesFromBackend={this.reloadCoursesFromBackend.bind(this)} key={course._id} course={course} />)}
            </ul>


            <form onSubmit={this.addCourse}>
              Name:
            <input name="newCourseName" value={this.state.newCourseName} onChange={(e) => this.handleFormChange(e)}/>
              Credits:
            <input name="newCourseCredits" value={this.state.newCourseCredits} onChange={(e) => this.handleFormChange(e)}/>
              Length (in periods):
            <input name="newCourseLength" value={this.state.newCourseLength} onChange={(e) => this.handleFormChange(e)}/>
              <button type="submit">lisää kurssi</button>
            </form>
              </div>
          } />
          

          
          <Route exact path="/" render={() => <HomePage/> } />

          

                <Route exact path="/courses/:id" render={({match}) =>
                  <EditCourse reloadCoursesFromBackend={this.reloadCoursesFromBackend.bind(this)} state={this.state} course={this.findCourse(match.params.id)} />}
      />
          



          </div>
        </Router>
      </div>
    )
  }

}

export default App