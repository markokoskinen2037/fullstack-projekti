import React, { Fragment } from "react"
import courseService from "../services/courses"
import userService from "../services/users"
import goalService from "../services/goals"

import {Input, FormControl, InputLabel, Select} from '@material-ui/core/';

import { Link } from "react-router-dom"





import {ListItem, ListItemText, Paper, Button, Grid, Typography} from "@material-ui/core/"


class Course extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            goalTarget: 5,
            goalDifficulty: "Helppo",
            goalExists : false,
            isActive : false

        }
    }



    handleEnter = (e) => {
        if(e.which === 13){
            alert("todo")
        }
      }

     deleteCourse = (course_id) => {
        console.log("Deleting course from database...")
        
        courseService.removeById(course_id) //Poistetaan kurssi tietokannasta
    
    
        //TODO Poista kurssi statesta
        this.props.removeCourseFromCourseListState(course_id)
    
    
        console.log("removal completed")
    
        //reloadCoursesFromBackend() //Tää pitää korjata lokaalilla staten manipulaatiolla
    
      }
    
     toggleActive = async (course_id) => { 
    
    
        if(this.props.user.activeCourses.find(course => course._id === course_id)){ //Jos aktivoitava kurssi on listalla
          console.log("deactivating...")
    
          var newList = this.props.user.activeCourses.filter(course => course._id !== course_id) //Poistetaan kurssi aktiivisten listasta
          this.props.user.activeCourses = newList
        } else { //Jos aktivoitava kurssi ei ole listalla
          console.log("activating...")
    
    
          this.props.user.activeCourses = this.props.user.activeCourses.concat(this.props.course) //Lisätään aktivoitava kurssi listalle
        }
    
        let uusiAktiivistenKurssienLista = {activeCourses: this.props.user.activeCourses}
    
    
        
    

        await userService.update(this.props.user._id, uusiAktiivistenKurssienLista)

        const populatedUser = await userService.get(this.props.user._id)



        this.props.updateUserState(populatedUser) 

    
      }

    createNewGoal = async ()  => {

        console.log("goalExists => " + this.goalExists())

        if(this.goalExists()){ //Jos goal on jo olemassa, ei edes yritetä luoda uutta koska se veisi aikaa ja resursseja.
            alert("You already have a goal for this course!")
        } else { //Goalia ei ole olemassa, joten pitää luoda uusi sellainen

        

        console.log("Creating a new goal for you!");

        const newGoal = {
                courseid: this.props.course._id,
                userid: this.props.user._id,
                target: this.state.goalTarget,
                difficulty: this.state.goalDifficulty
        }

        if(newGoal.target >=1 && newGoal.target <=5){ //1-5 kelpaa arvosanaksi
            console.log("Goal to be created: " + JSON.stringify(newGoal))


            const response = await goalService
            .create(newGoal)
            
            console.log("New goal saved:" + JSON.stringify(response.data))
        } else {
            alert("Arvosanan tulee olla väliltä 1-5!")
        }


        //Päivitetään lopuksi state.user
        const populatedUser = await userService.get(this.props.user._id)
        this.props.updateUserState(populatedUser) 

        }


        console.log("goalExists => " + this.goalExists())
        

      }

    goalExists = () => {






        const foundGoal = this.props.user.goals.find(goalObject => goalObject.course === this.props.course._id && goalObject.user === this.props.user._id)


        //console.log(this.props.course._id + "    " + this.props.user._id)

        //console.log(foundGoal)

        if(foundGoal === undefined){
            return false
        } else {
            return true
        }
      
    }

    isActive = () => {
        const result = this.props.user.activeCourses.find(courseObject => courseObject._id === this.props.course._id)

        

        if(result === undefined){
            return false
        } else {
            return true
        }
    }

    getGoal = () => {
        const foundGoal = this.props.user.goals.find(goalObject => goalObject.course === this.props.course._id && goalObject.user === this.props.user._id)

        return foundGoal


    }

    handleFormChange(event){ //Hoidetaan kenttiin kohdistuvat muutokset stateen
        console.log("called handleFormChange")
        console.log(event.target.name)
        const name = event.target.name
        this.setState({
            [name] : event.target.value
        })
    }




    


    render() {




            return (
                <Fragment>
                    <Grid item xs={12}>
                            <Paper style={{marginBottom: 10}}>
                                    <ListItem>
                                        <ListItemText  primary={this.props.course.title} />


                                {this.goalExists() ? ( //Jos goal on olemassa, renderöidään sen tiedot:
                                    <Fragment>
                                        <Typography style={{marginRight: 50}} variant="body1">Tavoitearvosana {this.getGoal().target}</Typography>
                                        <Typography style={{marginRight: 50}} variant="body1">{this.getGoal().difficulty}</Typography>
                                    </Fragment>
                                ) : ( //Jos goalia ei ole olemassa, renderöidään kentät tavoitearvosanalle ja vaikeusarviolle. Sekä lisäyspainikkeelle
                                    <Fragment >


                                            <InputLabel htmlFor="target-native-simple">Tavoitearvosana</InputLabel>
                                            <Select
                                                native
                                                name="goalTarget"
                                                value={this.state.goalTarget}
                                                onChange={(event) => this.handleFormChange(event)}
                                            >
                                                <option value={1}>1</option>
                                                <option value={2}>2</option>
                                                <option value={3}>3</option>
                                                <option value={4}>4</option>
                                                <option value={5}>5</option>
                                            </Select>

                                            <InputLabel htmlFor="difficulty-native-simple">Haastavuus</InputLabel>
                                            <Select
                                                native
                                                name="goalDifficulty"
                                                value={this.state.goalDifficulty}
                                                onChange={(event) => this.handleFormChange(event)}
                                            >
                                                <option value="Helppo">Helppo</option>
                                                <option value="Haastava">Haastava</option>
                                                <option value="Vaikea">Vaikea</option>
                                            </Select>

                                                                            
{/*                                         
                                        <Input disableUnderline={true} style={{width: 50}} type="number" name="goalTarget" value={this.state.goalTarget} onChange={(event) => this.handleFormChange(event)} />
                                        <Input disableUnderline={true} style={{width: 60, marginRight: 50}}  type="text" name="goalDifficulty" value={this.state.goalDifficulty} onChange={(event) => this.handleFormChange(event)} /> */}
                                        <Button variant="outlined" mini={true} size="small" color="inherit"  style={{marginRight: 50}}  onClick={() => this.createNewGoal()}><i className="material-icons">save</i></Button>

                                        </Fragment>
                                )}
        
                                        <Typography style={{marginRight: 50}} variant="body1">{this.props.course.credits} op</Typography>
        
                                        <Typography variant="body1">{this.props.course.length} periodia</Typography>
                                        <Button><Link style={{color: 'inherit'}} to={`/courses/${this.props.course._id}`}><i className="material-icons">edit</i></Link></Button>
                                        <Button onClick={() => this.deleteCourse(this.props.course._id)}><i className="material-icons">delete</i></Button>


                                {this.isActive() ? (
                                    <Button onClick={() => this.toggleActive(this.props.course._id)}><i className="material-icons">check_circle</i></Button>
                                ) : (
                                    <Button onClick={() => this.toggleActive(this.props.course._id)}><i className="material-icons">check_circle_outline</i></Button>
                                )}




                                        
                                    </ListItem>
                            </Paper>
                    </Grid>
                </Fragment>
            )










}}
export default Course