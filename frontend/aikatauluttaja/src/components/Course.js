import React from 'react'

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const Course = ({ course }) => {

  let link_target = "/courses/" + course._id

  return (
    <div>
      <li>{course.title} {course.credits} <b>op</b> {course.length} periodia pitkä <Link to={link_target}>Edit</Link></li> 
      
    </div>
  )
}

export default Course