import React, { Fragment } from 'react'
import Course from "./mui_components/Course"
import HomePage from "./mui_components/HomePage"
import EditCourse from "./mui_components/EditCourse"
import LoginForm from "./mui_components/LoginForm"
import CourseForm from "./mui_components/CourseForm"
import NavBar from "./mui_components/NavBar"
import RegisterForm from "./mui_components/RegisterForm"
import SimpleSnackbar from "./mui_components/SimpleSnackbar"
import Footer from "./mui_components/Footer"
import CourseListingInfo from "./mui_components/CourseListingInfo"

import courseService from "./services/courses"
import userService from "./services/users"
import goalService from "./services/goals"

import { Grid, List, CssBaseline, Input, FormControl, InputLabel, Checkbox, FormControlLabel } from '@material-ui/core/';





import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Typography } from '@material-ui/core';
import UserStatistics from './mui_components/UserStatistics';
import AdminPage from './mui_components/AdminPage';



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      courses: [],
      newCourseName: "",
      newCourseCredits: "",
      newCourseLength: "",
      user: null,
      alert: "",
      inProgress: undefined,
      filter: "",
      showOnlyActiveCourses: false,
      timeoutFunction: undefined
    }

  }

  setLoggedInUser = (user) => {
    this.setState({
      user: user
    })
  }

  getLoggedInUser = () => {
    return this.state.user
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
      courses: this.state.courses.filter(course => course._id !== response._id)
    })

    this.setState({ //Tallennetaan päivitetty kurssi
      courses: this.state.courses.concat(response)
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

    console.log("getting all goals from backend...")
    goalService
      .getAll()
      .then(goals => {
        this.setState({ goals })
        console.log("got " + goals.length + " goals from backend.")
      })



    console.log("checking for logged in user from local storage...")

    const userJSON = window.localStorage.getItem('user')
    if (userJSON) {
      console.log("found user from storage...")
      let user = JSON.parse(userJSON)

      userService
        .get(user._id)
        .then(upToDateUser => {
          //console.log(upToDateUser)
          this.setState({ user: upToDateUser })
          console.log("this.state.user updated with upToDateUser")
        })





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


  handleFormChange(event) {
    console.log(event.target.value)
    const name = event.target.name
    this.setState({
      [name]: event.target.value
    })
  }


  addCourseToCourseList = (newCourseData) => {
    this.setState({
      courses: this.state.courses.concat(newCourseData)
    })
  }


  findCourse = (id) => {
    let course = this.state.courses.find(course => course._id === id)
    return course
  }


  updateUserState = (updatedUser) => {
    this.setState({ user: updatedUser })
    console.log("state.user updated.")
  }

  addGoalToUserState = async (newGoal) => {

    const user = await userService
      .get(this.state.user._id)

    this.setState({ user })


  }

  removeCourseFromCourseListState = (course_id) => {

    let newCourseList = this.state.courses.filter(course => course._id !== course_id)

    this.setState({
      courses: newCourseList
    })
  }

  clearState = () => {
    this.setState({
      user: null,
      courses: null
    })
    console.log("state.user cleared")
  }

  showAlert = (content, inProgress) => {
    this.setState({ alert: "" })
    console.log("Setting alert")
    this.setState({ alert: content })

    this.setState({ inProgress })

  }

  toggleActiveCourses = () => {
    const value = !this.state.showOnlyActiveCourses
    this.setState({ showOnlyActiveCourses: value })
  }

  resetAlert = () => {
    this.setState({ alert: "" })
  }

  render() {


    if (this.state.courses === null) {
      this.reloadCoursesFromBackend()
    }


    return (



      <Fragment>
        <CssBaseline />
        <Router>
          <Grid container spacing={16}>
            <NavBar showAlert={this.showAlert} clearState={this.clearState} user={this.state.user} removeUserInfoFromState={this.removeCourseFromCourseListState} />



            {this.state.alert && <SimpleSnackbar resetAlert={this.resetAlert} content={this.state.alert} inProgress={this.state.inProgress} />}

            <Fragment>
              <Route exact path="/" render={() => <HomePage user={this.state.user} />} />
              <Route exact path="/" render={() => <LoginForm reloadCoursesFromBackend={this.reloadCoursesFromBackend} showAlert={this.showAlert} clearState={this.clearState} user={this.state.user} setLoggedInUser={this.setLoggedInUser} />} />
              <Route exact path="/" render={() => <RegisterForm setLoggedInUser={this.setLoggedInUser} showAlert={this.showAlert} user={this.state.user} />} />
            </Fragment>



            <Route exact path="/courses" render={() => {
              if (this.state.user != null) {
                return (
                  <Fragment>
                    <Grid style={{ margin: "20px" }} item xs={12}>
                      <Typography style={{ paddingBottom: "20px" }} variant="headline">Kurssit</Typography>






                      <List style={{ marginLeft: 10, marginRight: 10 }}>


                        <CourseListingInfo />


                        <FormControl style={{ marginLeft: 10, marginBottom: 15 }}>
                          <InputLabel htmlFor="name-simple">Hae kurssia nimeltä</InputLabel>
                          <Input id="name-simple" type="text" name="filter" value={this.state.filter} onChange={(event) => this.handleFormChange(event)} />
                        </FormControl>



                        <FormControlLabel style={{ position: "absolute", float: "right", right: "5px" }}
                          control={
                            <Checkbox
                              checked={this.state.showOnlyActiveCourses}
                              onClick={() => this.toggleActiveCourses()}
                            />
                          }
                          label="Näytä vain aktiiviset kurssit"
                        />


                        {this.state.courses.map(course => <Course
                          toggleActive={this.toggleActive}
                          findCourse={this.findCourse}
                          user={this.state.user}
                          reloadCoursesFromBackend={this.reloadCoursesFromBackend.bind(this)}
                          updateUserState={this.updateUserState}
                          key={course._id}
                          removeCourseFromCourseListState={this.removeCourseFromCourseListState}
                          addGoalToUserState={this.addGoalToUserState}
                          filter={this.state.filter}
                          goals={this.state.goals}
                          showAlert={this.showAlert}
                          showOnlyActiveCourses={this.state.showOnlyActiveCourses}
                          course={course} />)}
                      </List>
                    </Grid>


                    <Typography style={{ marginLeft: "30px", width: "100%" }} variant="headline">Kurssin lisäys</Typography>
                    <CourseForm showAlert={this.showAlert} user={this.state.user} updateCourseList={this.addCourseToCourseList} addCourse={this.addCourse} />

                  </Fragment>
                )
              } else {
                return (
                  null
                )
              }
            }

            } />





            <Route exact path="/userinfo" render={() => <UserStatistics getLoggedInUser={this.getLoggedInUser} />} />

            <Route exact path="/supersecretadminpage" render={() => <AdminPage user={this.state.user} />} />



            <Route exact path="/courses/:id" render={({ match }) =>
              <EditCourse showAlert={this.showAlert} updateUserState={this.updateUserState} user={this.state.user} updateCourseState={this.updateCourseState} reloadCoursesFromBackend={this.reloadCoursesFromBackend.bind(this)} state={this.state} course={this.findCourse(match.params.id)} />}
            />


            <Footer />




          </Grid>
        </Router>
      </Fragment>
    )
  }

}

export default App