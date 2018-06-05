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

    console.log(course_id)
    console.log(user)


    console.log(user.activeCourses)
    user.activeCourses = user.activeCourses.concat(course_id)
    console.log(user.activeCourses)

    userService.update(course_id, user)

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