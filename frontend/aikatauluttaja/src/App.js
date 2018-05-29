import React from 'react'
import Course from "./components/Course"
import courseService from "./services/courses"



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      courses: [],
      newCourseName: "",
      newCourseCredits: 0,
      newCourseLength: 0
    }
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


    

    console.log('helou!')
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
    return (
      <div>
        <h1>Kurssit</h1>
        <ul>
          {this.state.courses.map(course => <Course key={course._id} course={course} />)}
        </ul>

        <form onSubmit={this.addCourse}>
          <input
            value={this.state.newCourseName}
            onChange={this.handleCourseNameChange}
          />
          <input
            value={this.state.newCourseCredits}
            onChange={this.handleCourseCreditsChange}
          />
          <input
            value={this.state.newCourseLength}
            onChange={this.handleCourseLengthChange}
          />
          <button type="submit">lisää kurssi</button>
        </form>

      </div>
    )
  }

}

export default App