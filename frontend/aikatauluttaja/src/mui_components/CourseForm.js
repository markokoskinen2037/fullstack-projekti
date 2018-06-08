import {List, ListItem, ListItemText, Divider, Input, InputLabel, FormControl, Paper, Button, Grid, Toolbar, Typography} from "@material-ui/core/"

import React, {Fragment} from "react"
import courseService from "../services/courses"

class CourseForm extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            newCourseName: "",
            newCourseCredits: 0,
            newCourseLength: 0
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

      handleEnter = (e) => {
        console.log(e.which)
        if(e.which === 13){
            this.addCourse(e)
        }
      }


    render() {

      if(this.props.user === null){
        return(
            null
        )
      } else {
        return(





            <Fragment>
                <Grid item xs={12}>
                    <Paper style={{padding: 0, marginTop: 10, marginLeft: 10, marginRight: 10, paddingTop: 10}}>
                
                


                        <FormControl onKeyPress={(e) => this.handleEnter(e)} style={{marginLeft: 10}}>
                            <InputLabel htmlFor="name-simple">Kurssin nimi</InputLabel>
                            <Input id="name-simple" type="text" name="newCourseName" value={this.state.newCourseName} onChange={(event) => this.handleFormChange(event)} />
                         </FormControl>

                         <FormControl onKeyPress={(e) => this.handleEnter(e)} style={{marginLeft: 10}}>
                            <InputLabel htmlFor="length-simple">Pituus periodeissa</InputLabel>
                            <Input id="length-simple" type="number" name="newCourseLength" value={this.state.newCourseLength} onChange={(event) => this.handleFormChange(event)} />
                         </FormControl>

                         <FormControl onKeyPress={(e) => this.handleEnter(e)} style={{marginLeft: 10}}>
                            <InputLabel htmlFor="credits-simple">Opintopistemäärä</InputLabel>
                            <Input id="credits-simple" type="number" name="newCourseCredits" value={this.state.newCourseCredits} onChange={(event) => this.handleFormChange(event)} />
                         </FormControl>






                        <Button onClick={(e) => this.addCourse(e)} style={{marginLeft: 20, marginBottom: 15, marginTop: 10}} size="small" variant="contained" color="primary" type="submit">Lisää kurssi</Button>

                    
                    </Paper>
                 </Grid>
            </Fragment>



      )
      }


    }
}

export default CourseForm