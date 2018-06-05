import React from 'react'

import courseService from "../services/courses"
import userService from "../services/users"
import { Link } from 'react-router-dom'

const Course = ({ reloadCoursesFromBackend, course, user}) => {

  const deleteCourse = (course_id) => {
    console.log("Deleting course from database...")
    
    courseService.removeById(course_id)
    console.log("removal completed")

    reloadCoursesFromBackend()

  }

  const toggleActive = (course_id) => { 


    console.log("toggling as active...")
    user.activeCourses = user.activeCourses.concat(course_id)

    let test = {activeCourses: user.activeCourses}

    console.log(user.activeCourses)
    console.log(test)
    

    userService
    .update(course_id, test)
    .then(response => {
      console.log(response)
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