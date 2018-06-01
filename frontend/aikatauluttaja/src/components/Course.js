import React from 'react'

import courseService from "../services/courses"
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const Course = ({ reloadCoursesFromBackend, course }) => {

  const deleteCourse = (course_id) => {
    console.log("Deleting course from database...")
    
    courseService.removeById(course_id)
    console.log("removal combpleted")

  }

  return (
    <div>
      <li>{course.title} {course.credits} <b>op</b> {course.length} periodia pitkä <Link to={`/courses/${course._id}`}>Edit</Link> <button onClick={() => deleteCourse(course._id) }>Delete</button></li> 
      
    </div>
  )
}

export default Course