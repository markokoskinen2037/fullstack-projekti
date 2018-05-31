import React from 'react'

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const Course = ({ course }) => {

  return (
    <div>
      <li>{course.title} {course.credits} <b>op</b> {course.length} periodia pitkä <Link to={`/courses/${course._id}`}>Edit</Link></li> 
      
    </div>
  )
}

export default Course