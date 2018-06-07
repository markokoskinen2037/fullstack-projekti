import React, { Fragment } from 'react'
import Course from "./mui_components/Course"
import HomePage from "./mui_components/HomePage"
import EditCourse from "./components/EditCourse"
import LoginForm from "./mui_components/LoginForm"
import CourseForm from "./mui_components/CourseForm"
import NavBar from "./mui_components/NavBar"

import courseService from "./services/courses"
import userService from "./services/users"

import {Grid, List, Divider} from '@material-ui/core/';




import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Typography } from '@material-ui/core';



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      courses: [],
      newCourseName: "",
      newCourseCredits: "",
      newCourseLength: "",
      user: null
    }

  }

  setLoggedInUser = (user) => {
    this.setState({
      user: user
    })
  }

  reloadCoursesFromBackend() {
    courseService
    .getAll()
    .then(courses => {
      this.setState({ courses })
      console.log("reloaded " + courses.length + " courses from backend.")
    })
  }

  updateCourseState = (response) => {
     this.setState({ //Poistetaan vanha kurssi
       courses : this.state.courses.filter(course => course._id !== response._id)
     })

     this.setState({ //Tallennetaan päivitetty kurssi
       courses : this.state.courses.concat(response)
     })
  }

  toggleActive = (courseid) => {

    const course = this.findCourse(courseid)
    const userid = this.state.user.id
    


    userService
    .update(userid, course)
    .then(response => {
      console.log(response)
    })
    


  }


  componentDidMount() {
    console.log("getting courses from backend...")
    courseService
      .getAll()
      .then(courses => {
        this.setState({ courses })
        console.log("got " + courses.length + " courses from backend.")
      })


      console.log("checking for logged in user from local storage...")

      const userJSON = window.localStorage.getItem('user')
      if (userJSON) {
        const user = JSON.parse(userJSON)
        this.setState({user})
        courseService.setToken(user.token)
  }

  }

  addCourse = (event) => {
    event.preventDefault()

    const courseObject = {
      title: this.state.newCourseName,
      length: this.state.newCourseLength,
      credits: this.state.newCourseCredits
    }

    let errors = 0


    if (courseObject.title === "") {
      alert("Kurssilla tulee olla nimi!")
      errors++
    }

    if (isNaN(courseObject.length)) {
      alert("Kurssin pituuden tulee olla numero!")
      errors++
    }

    if (isNaN(courseObject.credits)) {
      alert("Kurssin opintopistemäärän tulee olla numero!")
      errors++
    }


    if (errors === 0) {
      courseService
        .create(courseObject)
        .then(response => {
          this.setState({
            courses: this.state.courses.concat(response.data),
            newCourseName: "",
            newCourseCredits: 0,
            newCourseLength: 0
          })
        })
    }
  }


  handleFormChange(event){
    console.log(event.target.value)
    const name = event.target.name
    this.setState({
        [name] : event.target.value
    })
}


  addCourseToCourseList = (newCourseData) => {
    this.setState({
      courses : this.state.courses.concat(newCourseData)
    })
  }


  findCourse = (id) => {
    let course = this.state.courses.find(course => course._id === id)
    return course
  }

  updateUserState = (updatedUser) => {
    this.setState({id : updatedUser._id})
    //console.log("state.user updated.")
  }

  removeCourseFromCourseListState = (course_id) => {

    let newCourseList = this.state.courses.filter(course => course._id !== course_id)

    this.setState({
      courses : newCourseList
    })
  }

  removeUserInfoFromState = () => {
    this.setState({user : null})
    console.log("state.user cleared")
  }
  

  render() {
    return (
      <Fragment>
        <Router>
        <Grid container spacing={16}>
            <NavBar user={this.state.user} removeUserInfoFromState={this.removeCourseFromCourseListState}/>

              <LoginForm clearState={this.removeUserInfoFromState}user={this.state.user} setLoggedInUser={this.setLoggedInUser}/>

          

                <Route exact path="/courses" render={() => {
                  if(this.state.user != null){
                    return (
                      <Fragment>
                        <Grid item xs={12}>
                        <Typography style={{marginLeft: 20}} variant="headline">Kurssit</Typography>
                        
                        <List style={{marginLeft: 10, marginRight: 10}}>
                      {this.state.courses.map(course => <Course
                        toggleActive={this.toggleActive}
                        findCourse = {this.findCourse}
                        user={this.state.user}
                        reloadCoursesFromBackend={this.reloadCoursesFromBackend.bind(this)}
                        updateUserState={this.updateUserState}
                        key={course._id}
                        removeCourseFromCourseListState={this.removeCourseFromCourseListState}
                        course={course} />)}
                        </List>
                        </Grid>
  
                      <CourseForm user={this.state.user} updateCourseList={this.addCourseToCourseList} addCourse={this.addCourse}/>
                      
                      </Fragment>
                    )
                  } else {
                    return (
                      <p>Please login to view and modify courses.</p>
                    )
                  }
                }

                } />



                <Route exact path="/" render={() => <HomePage user={this.state.user}/> } />

                  

                <Route exact path="/courses/:id" render={({match}) =>
                          <EditCourse updateCourseState={this.updateCourseState} reloadCoursesFromBackend={this.reloadCoursesFromBackend.bind(this)} state={this.state} course={this.findCourse(match.params.id)} />}
                />
                  



          </Grid>
        </Router>
      </Fragment>
    )
  }

}

export default App