import React from 'react'

import courseService from "../services/courses"
import userService from "../services/users"
import { Link } from 'react-router-dom'

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
      <div>
        <li style={{color : 'green'}}>{course.title} {course.credits} <b>op</b> {course.length} periodia pitkä
          <Link to={`/courses/${course._id}`}>Muokkaa</Link>
          <button onClick={() => deleteCourse(course._id) }>Poista</button>
          <button onClick={() => toggleActive(course._id)}>Poista aktiivisista kursseista</button></li> 
        
      </div>
    )
  } else {
    return (
      <div>
        <li style={{color : 'red'}}>{course.title} {course.credits} <b>op</b> {course.length} periodia pitkä
          <Link to={`/courses/${course._id}`}>Muokkaa</Link>
          <button onClick={() => deleteCourse(course._id) }>Poista</button>
          <button onClick={() => toggleActive(course._id)}>Lisää aktiiviseksi kurssiksi</button></li> 
        
      </div>
    )
  }
  


}

export default Course