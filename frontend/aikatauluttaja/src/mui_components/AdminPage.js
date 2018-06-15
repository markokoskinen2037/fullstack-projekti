import React, { Component, Fragment } from 'react'

import loginService from "../services/login"
import userService from "../services/users"
import courseService from "../services/courses"
import goalService from "../services/goals"
import { withRouter } from "react-router-dom";

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Typography } from "@material-ui/core";

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
        return (
        <div>
            <Button onClick={() => this.deleteAllGoals()} style={{marginLeft: 20, marginBottom: 15, marginTop: 10}} size="small" variant="contained" color="secondary" type="submit">Delete all Goals</Button>
            <Button onClick={() => this.deleteAllUsers()} style={{marginLeft: 20, marginBottom: 15, marginTop: 10}} size="small" variant="contained" color="secondary" type="submit">Delete all Users</Button>
            <Button onClick={() => this.deleteAllCourses()} style={{marginLeft: 20, marginBottom: 15, marginTop: 10}} size="small" variant="contained" color="secondary" type="submit">Delete all Courses</Button>
            <br></br>
            <Button onClick={() => this.deleteEverything()} style={{marginLeft: 20, marginBottom: 15, marginTop: 10}} size="small" variant="contained" color="secondary" type="submit">DELETE EVERYTHING</Button>
          </div>
        )
    }

  
}

export default withRouter(AdminPage)