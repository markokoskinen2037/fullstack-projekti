import {Input, Select, InputLabel, FormControl, Paper, Button, Grid} from "@material-ui/core/"

import React, {Fragment} from 'react';
import courseService from "../services/courses"
import goalService from "../services/goals"
import userService from "../services/users"
import { withRouter } from "react-router-dom";



class EditCourse extends React.Component {
  constructor(props) {
    super(props)

    if(this.props.course !== undefined){
        this.state = {
            editedCourseId: this.props.course._id,
            editedCourseTitle: this.props.course.title,
            editedCourseCredits: this.props.course.credits,
            editedCourseLength: this.props.course.length,
            editedCourseGoalTarget : "goal not found...",
            editedCourseGoalDifficulty : "goal not found...",
            currentGoal : undefined,
            goalTarget : 5,
            goalDifficulty: "Helppo"
          }
    } else {
        this.state = {
            editedCourseId: undefined,
            editedCourseTitle: undefined,
            editedCourseCredits: undefined,
            editedCourseLength: undefined,
            editedCourseGoalTarget : "goal not found...",
            currentGoal : undefined,
            goalTarget : undefined
        }
    }



    }

    handleFormChange(event){
        //console.log(event.target.value)
        const name = event.target.name
        this.setState({
            [name] : event.target.value
        })
    }

    createNewGoal = async ()  => {

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

    updateCourse = async (e) => {
        

        //console.log(JSON.stringify(this.state));

        


        e.preventDefault()

        //alert(this.state.editedCourseId)
        

        const editedCourse = { //Luodaan uusi kurssi olio
            _id : this.state.editedCourseId,
            title: this.state.editedCourseTitle,
            length: this.state.editedCourseLength,
            credits: this.state.editedCourseCredits
          }

          //console.log("you called ?")
          //console.log(editedCourse)

          courseService //Otetaan yhteys kurssiPalveluun
          .update(editedCourse._id, editedCourse) //Korvataan vanhat kunssin tiedot uusilla tietokannassa
          .then(response => {
            //console.log(response) //response sisältää kurssiolion joka tulee sijoittaa stateen
            // this.props.reloadCoursesFromBackend() //Tämä on kömpelö ja aikaa vievä tapa päivittää tilassa olevat kurssit...
            
            this.props.updateCourseState(response)

            
          })


          //Kurssi on nyt päivitetty, seuraavaksi pitää päivittää goal jos tarpeellista
          //alert("hello")

          if(this.state.editedCourseGoalTarget === "goal not found..."){
              //alert("creating new goal...")
              this.createNewGoal()
          }




          if(!isNaN(this.state.editedCourseGoalTarget)){    
             
            if(this.state.editedCourseGoalTarget >= 1 && this.state.editedCourseGoalTarget <= 5){
                let tempGoal = {
                    courseid : this.props.course._id,
                    userid: this.props.user._id,
                    target : this.state.goalTarget,
                    difficulty: this.state.goalDifficulty
                }
  
                await goalService.update(this.state.currentGoal._id, tempGoal)
  
                let updatedUser = await userService.get(this.props.user._id)
  
                this.props.updateUserState(updatedUser)
                this.props.history.push("/courses");

            }else {
                alert("Tavoitearvosanan tulee olla väliltä 1-5")
                this.setState({editedCourseGoalTarget : 1})
            }



              
          }

          




          

    }

    handleEnter = (e) => {
        //console.log(e.which)
        if(e.which === 13){
            this.updateCourse(e)
        }
      }

    getGoalValue = () => {
        const foundGoal = this.props.user.goals.find(goalObject => goalObject.course === this.props.course._id)

        this.setState({currentGoal : foundGoal})

        if(foundGoal !== undefined){
            this.setState({ editedCourseGoalTarget : foundGoal.target, goalDifficulty : foundGoal.difficulty, goalTarget : foundGoal.target})
        }

        
    }

    componentDidMount = () => {
        if(this.state.editedCourseId !== undefined){
            this.getGoalValue()
        } else { //Jos käyttäjä painaa f5 ja tila nollaantuu mennään suosiolla takaisin kurssilistaukseen.
            this.props.history.push("/courses");
        }
       
    }



  
  render() {


    return (




        <Fragment>
        <Grid item xs={12}>
            <Paper style={{padding: 0, marginTop: 10, marginLeft: 10, marginRight: 10, paddingTop: 10}}>
        
        


                <FormControl onKeyPress={(e) => this.handleEnter(e)} style={{marginLeft: 10}}>
                    <InputLabel htmlFor="name-simple">Kurssin nimi</InputLabel>
                    <Input id="name-simple" type="text" name="editedCourseTitle" value={this.state.editedCourseTitle}
                    onChange={(event) => this.handleFormChange(event)} />
                 </FormControl>

                 <FormControl onKeyPress={(e) => this.handleEnter(e)} style={{marginLeft: 10, width: "135px"}}>
                    <InputLabel htmlFor="length-simple">Pituus periodeissa</InputLabel>
                    <Input id="length-simple" type="number" name="editedCourseLength" value={this.state.editedCourseLength}
                    onChange={(event) => this.handleFormChange(event)} />
                 </FormControl>

                 <FormControl onKeyPress={(e) => this.handleEnter(e)} style={{marginLeft: 10, width: "135px"}}>
                    <InputLabel htmlFor="credits-simple">Opintopistemäärä</InputLabel>
                    <Input id="credits-simple" type="number" name="editedCourseCredits" value={this.state.editedCourseCredits}
                    onChange={(event) => this.handleFormChange(event)} />
                 </FormControl>

                 <FormControl onKeyPress={(e) => this.handleEnter(e)} style={{marginLeft: 10, width: "135px"}}>
                    <InputLabel htmlFor="goal-simple">Tavoitearvosana</InputLabel>
                    <Input id="goal-simple" type="number" name="goalTarget" value={this.state.goalTarget}
                    onChange={(event) => this.handleFormChange(event)} />
                 </FormControl>


                <FormControl onKeyPress={(e) => this.handleEnter(e)} style={{marginLeft: 10}}>
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
                </FormControl>



                <Button onClick={(e) => this.updateCourse(e)} style={{marginLeft: 20, marginBottom: 15, marginTop: 10}}
                size="small" variant="contained" color="primary" type="submit">Tallenna muutokset</Button>

            
            </Paper>
         </Grid>
    </Fragment>
    );
  }
}

export default withRouter(EditCourse);