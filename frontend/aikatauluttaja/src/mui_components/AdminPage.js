import React, { Component } from 'react'

import userService from "../services/users"
import courseService from "../services/courses"
import goalService from "../services/goals"
import { withRouter } from "react-router-dom";


import Button from '@material-ui/core/Button';


class AdminPage extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         
      }
    }

    deleteAllGoals = async ()  => {
        await goalService.deleteAllGoals()
    }

    deleteAllUsers = async ()  => {
        await userService.deleteAllUsers()
    }

    deleteAllCourses = async ()  => {
        await courseService.deleteAllCourses()
    }

    deleteEverything = async () => {
        await this.deleteAllCourses()
        await this.deleteAllGoals()
        await this.deleteAllUsers()
        alert("Everything is gone :(")
    }


    
  render() {

    if(this.props.user !== null && this.props.user.username === "admin"){
        return (
            <div>
                <Button onClick={() => this.deleteAllGoals()} style={{marginLeft: 20, marginBottom: 15, marginTop: 10}} size="small" variant="contained" color="secondary" type="submit">Delete all Goals</Button>
                <Button onClick={() => this.deleteAllUsers()} style={{marginLeft: 20, marginBottom: 15, marginTop: 10}} size="small" variant="contained" color="secondary" type="submit">Delete all Users</Button>
                <Button onClick={() => this.deleteAllCourses()} style={{marginLeft: 20, marginBottom: 15, marginTop: 10}} size="small" variant="contained" color="secondary" type="submit">Delete all Courses</Button>
                <br></br>
                <Button onClick={() => this.deleteEverything()} style={{marginLeft: 20, marginBottom: 15, marginTop: 10}} size="small" variant="contained" color="secondary" type="submit">DELETE EVERYTHING</Button>
              </div>
            )
    } else {
        return (
            <div>
                <img alt="watch out" width={window.innerWidth} style={{display: "block", marginLeft: "auto",marginRight: "auto"}} src="https://cdn-images-1.medium.com/max/2000/1*-m_hxcxFCO0_-ND-FBFz6g.jpeg"/>
            </div>
        )
    }



    }

  
}

export default withRouter(AdminPage)