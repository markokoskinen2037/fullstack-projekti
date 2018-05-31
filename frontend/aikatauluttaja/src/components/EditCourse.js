import React from 'react'

import courseService from "../services/courses"

const EditCourse = ({ course }) => {


    console.log("Found a matching course for URL param (id):")
    console.log(course)


    return (
        <div>
            <h1>Muokataan kurssia</h1>
            <ul>
<li>Nimi: {course.title}</li>
<li>Laajuus: {course.credits} opintopistettä</li>
<li>Pituus: {course.length} periodia</li>
                </ul>


            

        <button>Tallenna muutokset</button>
      </div>
    )
}

export default EditCourse