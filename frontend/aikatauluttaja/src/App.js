import React from 'react'
import Course from "./components/Course"



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      courses: props.courses
    }
  }


  render() {
    return (
      <div>
        <h1>Kurssit</h1>
        <ul>
          {this.state.courses.map(course => <Course key={course.id} course={course} />)}
        </ul>
      </div>
    )
  }

}

export default App