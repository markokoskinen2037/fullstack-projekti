import React from "react"
import courseService from "../services/courses"

class CourseForm extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            newCourseName: "",
            newCourseCredits: "",
            newCourseLength: ""
        }
    }

    handleFormChange(event){
        console.log(event.target.value)
        const name = event.target.name
        this.setState({
            [name] : event.target.value
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
                newCourseName: "",
                newCourseCredits: 0,
                newCourseLength: 0
              })
              this.props.updateCourseList(response.data)
            })
        }
      }


    render() {
        return(
            <div>
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
        )
    }
}

export default CourseForm