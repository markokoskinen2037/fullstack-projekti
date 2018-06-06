import React from 'react'

import courseService from "../services/courses"
import userService from "../services/users"
import { Link } from 'react-router-dom'

const Course = ({ reloadCoursesFromBackend, updateUserState, course, user}) => {

  const deleteCourse = (course_id) => {
    console.log("Deleting course from database...")
    
    courseService.removeById(course_id)
    console.log("removal completed")

    reloadCoursesFromBackend()

  }

  const toggleActive = (course_id) => { 


    if(user.activeCourses.includes(course_id)){ //Poistetaan kurssi aktiivisten listasta
      console.log("This course already marked as active, removing it from active courses list...")
      var index = user.activeCourses.indexOf(course_id)
      if (index > -1) {
        user.activeCourses.splice(index, 1);
      }
    } else { //Lisätään kurssi aktiivisten listaan
      console.log("Adding this course to activeCourses list...")
      user.activeCourses = user.activeCourses.concat(course_id)
    }






    let test = {activeCourses: user.activeCourses}

    console.log(user.activeCourses)
    console.log(test)
    

    userService
    .update(user.id, test)
    .then(response => {
      console.log(response)
      updateUserState(response)
    })

  }



  

  return (
    <div>
      <li>{course.title} {course.credits} <b>op</b> {course.length} periodia pitkä
        <Link to={`/courses/${course._id}`}>Edit</Link>
        <button onClick={() => deleteCourse(course._id) }>Delete</button>
        <button onClick={() => toggleActive(course._id)}>Lisää aktiiviseksi kurssiksi</button></li> 
      
    </div>
  )
}

export default Course