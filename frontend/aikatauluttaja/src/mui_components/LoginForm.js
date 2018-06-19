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



class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: ""
        }
    }

    handleFormChange(event){ //Hoidetaan kenttiin kohdistuvat muutokset stateen
        const name = event.target.name
        this.setState({
            [name] : event.target.value
        })
    }

      login = async (event) => {
          if(event){
            event.preventDefault()
          }
        
        try {
          const dataFromBackEnd = await loginService.login({ //DatafromBackEnd sisältää user olion ja token stringin.
            username: this.state.username,
            password: this.state.password
          })

          this.setState({ username: '', password: ''}) //Nollataan kirjautumiskenttien arvot
          courseService.setToken(dataFromBackEnd.token) //Asetetaan courseServicelle token muistiin
          this.props.setLoggedInUser(dataFromBackEnd.user) //Reactin stateen tallennettava user
          window.localStorage.setItem('user', JSON.stringify(dataFromBackEnd.user)) //local storageen tallennettava user ja token!
          const greeting = "Kirjauduit sisään käyttäjällä: " + dataFromBackEnd.user.username
          this.props.showAlert(greeting)

          
          this.props.history.push("/courses")

      

        } catch(exception) {
            this.props.showAlert("Virheellinen käyttäjätunnus tai salasana.")
        }
      }





      handleEnter = (e) => {
        if(e.which === 13){
            this.login()
        }
      }


    render() {

        


        if(this.props.user === null){
            return (




                <Fragment>
                    <Grid item md={12} sm={12} xs={12} lg={8}>
                    <Paper style={{padding: 0, marginTop: 10, marginLeft: 10, marginRight: 10}}>
                    
                     

                    
                        <FormControl onKeyPress={(e) => this.handleEnter(e)}  style={{marginLeft: 10}}>
                            <InputLabel htmlFor="name-simple">Käyttäjätunnus</InputLabel>
                            <Input id="name-simple" type="text" name="username" value={this.state.username} onChange={(event) => this.handleFormChange(event)} />
                        </FormControl>




                        <FormControl onKeyPress={(e) => this.handleEnter(e)} style={{marginLeft: 10}} >
                            <InputLabel htmlFor="loginPassword-simple">Salasana</InputLabel>
                            <Input id="loginPassword-simple" type="password" name="password" value={this.state.password} onChange={(event) => this.handleFormChange(event)} />
                        </FormControl>
                    


                    <Button  onClick={(e) => this.login(e)} style={{marginLeft: 20, marginBottom: 15, marginTop: 10, paddingLeft: 30, paddingRight: 30}} size="small" variant="contained" color="primary" type="submit">Kirjaudu sisään</Button>

                
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