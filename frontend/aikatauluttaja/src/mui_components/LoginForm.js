import React, { Fragment } from "react"
import loginService from "../services/login"
import courseService from "../services/courses"
import { withRouter } from "react-router-dom";

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { CircularProgress,Typography, FormControlLabel, Checkbox } from "@material-ui/core";



class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            stayLoggedIn: true
        }
    }

    handleFormChange(event){ //Hoidetaan kenttiin kohdistuvat muutokset stateen
        const name = event.target.name
        this.setState({
            [name] : event.target.value
            })
        }

    login = async (event) => {
        this.props.showAlert("Kirjaudutaan sisään...")
        
          if(event){
            event.preventDefault()
          }

        if(this.state.username.length > 0 && this.state.password.length > 0){
            
            try {
                const dataFromBackEnd = await loginService.login({ //DatafromBackEnd sisältää user olion ja token stringin.
                  username: this.state.username,
                  password: this.state.password
                })
      
                this.setState({ username: '', password: ''}) //Nollataan kirjautumiskenttien arvot
                courseService.setToken(dataFromBackEnd.token) //Asetetaan courseServicelle token muistiin
                this.props.setLoggedInUser(dataFromBackEnd.user) //Reactin stateen tallennettava user

                if(this.state.stayLoggedIn){ //Jos checkbox on true, tallennetaan user talteen locastorageen
                    window.localStorage.setItem('user', JSON.stringify(dataFromBackEnd.user)) //local storageen tallennettava user ja token!
                }

                const greeting = "Kirjauduit sisään käyttäjällä: " + dataFromBackEnd.user.username
                this.props.showAlert(greeting)
      
                
                this.props.history.push("/courses")
      
            
      
              } catch(exception) {
                  this.props.showAlert("Virheellinen käyttäjätunnus tai salasana.")
              }
        } else {
            this.props.showAlert("Älä jätä mitään kenttää tyhjäksi!")
        }
        

      }





      handleEnter = (e) => {
        if(e.which === 13){
            this.login()
        }
      }

      toggleLoggedIn = () => {
          let newVal = !this.state.stayLoggedIn
          this.setState({stayLoggedIn: newVal})
      }

    render() {

        


        if(this.props.user === null){
            return (




                <Fragment>
                    <Grid item sm={6} md={6}>
                    
                    <Paper style={{padding: 0, marginTop: 10, marginLeft: 10, marginRight: 10}}>
                         <Typography style={{marginLeft: 20, paddingTop: 20}} variant="display1">Kirjaudu sisään</Typography>
                    
                     

                    
                        <FormControl onKeyPress={(e) => this.handleEnter(e)}  style={{marginLeft: 20}}>
                            <InputLabel htmlFor="name-simple">Käyttäjätunnus</InputLabel>
                            <Input id="name-simple" type="text" name="username" value={this.state.username} onChange={(event) => this.handleFormChange(event)} />
                        </FormControl>




                        <FormControl onKeyPress={(e) => this.handleEnter(e)} style={{marginLeft: 20}} >
                            <InputLabel htmlFor="loginPassword-simple">Salasana</InputLabel>
                            <Input id="loginPassword-simple" type="password" name="password" value={this.state.password} onChange={(event) => this.handleFormChange(event)} />
                        </FormControl>

                              <FormControlLabel style={{marginLeft: 10}}
                                control={
                                  <Checkbox
                                  checked={this.state.stayLoggedIn}
                                  onClick={() => this.toggleLoggedIn()}
                                />
                                }
                                label="Pysy kirjautuneena?"
                              />
                    


                    <Button id="loginButton" onClick={(e) => this.login(e)} style={{marginLeft: 20, marginBottom: 15, marginTop: 10, paddingLeft: 30, paddingRight: 30}}
                    size="small" variant="contained" color="primary" type="submit">Kirjaudu sisään</Button>

                
                </Paper>
                </Grid>
    </Fragment>





            )
        } else {
            return(
                null
            )
            
        }




}

}

export default withRouter(LoginForm);