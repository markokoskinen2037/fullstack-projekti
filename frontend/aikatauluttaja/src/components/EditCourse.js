import React from 'react'

import courseService from "../services/courses"

const EditCourse = ({ course , state}) => {


    console.log("Found a matching course for URL param (id):")
    console.log(course)


    console.log("----")



    return (
        <div>
             <form>
                    Name:
                <input value={course.title}/>
                    Credits:
                <input value={course.credits}/>
                    Length (in periods):
                <input value={course.length}/>
                    <button type="submit">lisää kurssi</button>
          </form>
      </div>
    )
}

export default EditCourse