import React, { Fragment } from 'react'

import courseService from "../services/courses"
import userService from "../services/users"
import { Link } from 'react-router-dom'


import {List, ListItem, ListItemText, Divider, Input, InputLabel, FormControl, Paper, Button, Grid, Toolbar, Typography} from "@material-ui/core/"

import red from '@material-ui/core/colors/red';


const Course = ({ reloadCoursesFromBackend, updateUserState, findCourse, removeCourseFromCourseListState, course, user}) => {

  const deleteCourse = (course_id) => {
    console.log("Deleting course from database...")
    
    courseService.removeById(course_id) //Poistetaan kurssi tietokannasta


    //TODO Poista kurssi statesta
    removeCourseFromCourseListState(course_id)


    console.log("removal completed")

    //reloadCoursesFromBackend() //Tää pitää korjata lokaalilla staten manipulaatiolla

  }

  const toggleActive = (course_id) => { 

    if(user.activeCourses.find(course => course._id === course_id)){ //Jos aktivoitava kurssi on listalla

      var newList = user.activeCourses.filter(course => course._id !== course_id) //Poistetaan kurssi aktiivisten listasta


      
      user.activeCourses = newList








    } else { //Jos aktivoitava kurssi ei ole listalla
      console.log("activating")


      user.activeCourses = user.activeCourses.concat(course) //Lisätään aktivoitava kurssi listalle
    }

    let test = {activeCourses: user.activeCourses}

    //console.log(user.activeCourses)
    //console.log(test)
    

    userService
    .update(user.id, test)
    .then(response => {
      //console.log(response)
      updateUserState(response)
    })

  }

  if(user.activeCourses.find(aktiivinen => aktiivinen._id === course._id)){







    return (
        <Fragment>
            <Grid item xs={12}>
                    <Paper>
                        
                            <ListItem>
                            <ListItemText primary={course.title} />
                            <Typography style={{marginRight: 50}} variant="button">{course.credits} op</Typography>
                            <Typography variant="button">{course.length} periodia</Typography>
                            <Button><Link style={{color: 'inherit'}} to={`/courses/${course._id}`}>Muokkaa</Link></Button>
                            <Button onClick={() => deleteCourse(course._id)}>Poista</Button>
                            <Button onClick={() => toggleActive(course._id)}><i className="material-icons">star_border</i></Button>
                            </ListItem>

                    </Paper>
            </Grid>
        </Fragment>





    )
  } else {
    return (
        <Fragment>
            <Grid item xs={12}>
                    <Paper>
                        
                            <ListItem>
                            <ListItemText primary={course.title} />
                            <Typography style={{marginRight: 50}} variant="button">{course.credits} op</Typography>
                            <Typography variant="button">{course.length} periodia</Typography>
                            <Button><Link style={{color: 'inherit'}} to={`/courses/${course._id}`}>Muokkaa</Link></Button>
                            <Button onClick={() => deleteCourse(course._id)}>Poista</Button>
                            <Button onClick={() => toggleActive(course._id)}><i className="material-icons">star</i></Button>
                            </ListItem>

                    </Paper>
            </Grid>
        </Fragment>




    )






  }
  


}

export default Course