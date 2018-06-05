import React from 'react'

import courseService from "../services/courses"
import { Link } from 'react-router-dom'

const Course = ({ reloadCoursesFromBackend, course, toggleActive }) => {

  const deleteCourse = (course_id) => {
    console.log("Deleting course from database...")
    
    courseService.removeById(course_id)
    console.log("removal completed")

    reloadCoursesFromBackend()

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