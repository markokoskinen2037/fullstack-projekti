import React from 'react'
import Course from "./components/Course"
import courseService from "./services/courses"



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      courses: []
    }
  }

  componentDidMount() {
    console.log("getting courses from backend...")
    courseService
      .getAll()
      .then(courses => {
        this.setState({ courses })
        console.log("got "+ courses.length +" courses from backend.")
      })
  }


  render() {
    return (
      <div>
        <h1>Kurssit</h1>
        <ul>
          {this.state.courses.map(course => <Course key={course._id} course={course} />)}
        </ul>
      </div>
    )
  }

}

export default App