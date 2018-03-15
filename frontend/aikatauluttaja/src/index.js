import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import axios from "axios"
const baseUrl = "/api/courses"


const courses = [
  {
    id: 1,
    title: "JYM",
    credits: 5,
    length: 2
  }, {
    id: 2,
    title: "TIRA",
    credits: "8-10",
    length: 2
  }
]

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

console.log(getAll())





ReactDOM.render(
  <App courses={courses} />,
  document.getElementById('root')
)