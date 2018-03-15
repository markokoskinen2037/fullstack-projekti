import React from 'react'

const Course = ({ course }) => {
  return (
    <div>
    <li>{course.title} {course.credits} <b>op</b> {course.length} periodia pitkä</li>
    </div>
  )
}

export default Course