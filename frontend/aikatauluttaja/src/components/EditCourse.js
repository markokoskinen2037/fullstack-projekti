import React from 'react'

const EditCourse = ({ course , state}) => {


    console.log("Found a matching course for URL param (id):")
    console.log(course)





    return (
        <div>
             <form>
                    Nimi:
                <input value={course.title}/>
                    Laajuus (op):
                <input value={course.credits}/>
                    Pituus (periodeissa):
                <input value={course.length}/>
                    <button type="submit">Tallenna muutokset</button>
          </form>
      </div>
    )
}

export default EditCourse