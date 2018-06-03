import React from 'react';
import courseService from "../services/courses"
import { withRouter } from "react-router-dom";


class EditCourse extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        editedCourseId: this.props.course._id,
        editedCourseTitle: this.props.course.title,
        editedCourseCredits: this.props.course.credits,
        editedCourseLength: this.props.course.length
      }
    }

    handleFormChange(event){
        console.log(event.target.value)
        const name = event.target.name
        this.setState({
            [name] : event.target.value
        })
    }

    updateCourse(e){
        e.preventDefault()
        

        const editedCourse = {
            _id : this.state.editedCourseId,
            title: this.state.editedCourseTitle,
            length: this.state.editedCourseLength,
            credits: this.state.editedCourseCredits
          }

          console.log("you called ?")
          console.log(editedCourse)

          courseService
          .update(editedCourse._id, editedCourse)
          .then(response => {
            console.log(response)
            this.props.reloadCoursesFromBackend()
            
          })
          this.props.history.push("/courses");

    }




  
  render() {




    return (
        <div>
        <form onSubmit={(e) => this.updateCourse(e)}>
               Nimi:
           <input type="text" name="editedCourseTitle" value={this.state.editedCourseTitle} onChange={(event) => this.handleFormChange(event)}/>

                Laajuus (op):
           <input type="number" name="editedCourseCredits" value={this.state.editedCourseCredits} onChange={(event) => this.handleFormChange(event)}/>

              Pituus (periodeissa):
           <input type="number" name="editedCourseLength" value={this.state.editedCourseLength} onChange={(event) => this.handleFormChange(event)}/>

               <button type="submit">Tallenna muutokset</button>
     </form>
 </div>
    );
  }
}

export default withRouter(EditCourse);