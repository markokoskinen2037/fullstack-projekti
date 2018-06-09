import {Input, InputLabel, FormControl, Paper, Button, Grid} from "@material-ui/core/"

import React, {Fragment} from 'react';
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
        

        const editedCourse = { //Luodaan uusi kurssi olio
            _id : this.state.editedCourseId,
            title: this.state.editedCourseTitle,
            length: this.state.editedCourseLength,
            credits: this.state.editedCourseCredits
          }

          console.log("you called ?")
          console.log(editedCourse)

          courseService //Otetaan yhteys kurssiPalveluun
          .update(editedCourse._id, editedCourse) //Korvataan vanhat kunssin tiedot uusilla tietokannassa
          .then(response => {
            console.log(response) //response sisältää kurssiolion joka tulee sijoittaa stateen
            // this.props.reloadCoursesFromBackend() //Tämä on kömpelö ja aikaa vievä tapa päivittää tilassa olevat kurssit...
            
            this.props.updateCourseState(response)

            
          })
          this.props.history.push("/courses");

    }

    handleEnter = (e) => {
        console.log(e.which)
        if(e.which === 13){
            this.updateCourse(e)
        }
      }



  
  render() {

    return (




        <Fragment>
        <Grid item xs={12}>
            <Paper style={{padding: 0, marginTop: 10, marginLeft: 10, marginRight: 10, paddingTop: 10}}>
        
        


                <FormControl onKeyPress={(e) => this.handleEnter(e)} style={{marginLeft: 10}}>
                    <InputLabel htmlFor="name-simple">Kurssin nimi</InputLabel>
                    <Input id="name-simple" type="text" name="editedCourseTitle" value={this.state.editedCourseTitle} onChange={(event) => this.handleFormChange(event)} />
                 </FormControl>

                 <FormControl onKeyPress={(e) => this.handleEnter(e)} style={{marginLeft: 10}}>
                    <InputLabel htmlFor="length-simple">Pituus periodeissa</InputLabel>
                    <Input id="length-simple" type="number" name="editedCourseLength" value={this.state.editedCourseLength} onChange={(event) => this.handleFormChange(event)} />
                 </FormControl>

                 <FormControl onKeyPress={(e) => this.handleEnter(e)} style={{marginLeft: 10}}>
                    <InputLabel htmlFor="credits-simple">Opintopistemäärä</InputLabel>
                    <Input id="credits-simple" type="number" name="editedCourseCredits" value={this.state.editedCourseCredits} onChange={(event) => this.handleFormChange(event)} />
                 </FormControl>






                <Button onClick={(e) => this.updateCourse(e)} style={{marginLeft: 20, marginBottom: 15, marginTop: 10}} size="small" variant="contained" color="primary" type="submit">Tallenna muutokset</Button>

            
            </Paper>
         </Grid>
    </Fragment>








//         <div>
//         <form onSubmit={(e) => this.updateCourse(e)}>
//                Nimi:
//            <input type="text" name="editedCourseTitle" value={this.state.editedCourseTitle} onChange={(event) => this.handleFormChange(event)}/>

//                 Laajuus (op):
//            <input type="number" name="editedCourseCredits" value={this.state.editedCourseCredits} onChange={(event) => this.handleFormChange(event)}/>

//               Pituus (periodeissa):
//            <input type="number" name="editedCourseLength" value={this.state.editedCourseLength} onChange={(event) => this.handleFormChange(event)}/>

//                <button type="submit">Tallenna muutokset</button>
//      </form>
//  </div>
    );
  }
}

export default withRouter(EditCourse);