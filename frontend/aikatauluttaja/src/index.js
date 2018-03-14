import React from 'react'
import ReactDOM from 'react-dom'
import App from "./App"

const courses = [
  {
    id: 1,
    title: "JYM"
  }, {
    id: 2,
    title: "TIRA"
  }
]





ReactDOM.render(
  <App courses={courses} />,
  document.getElementById('root')
)