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

    handleFormChange(event){
        console.log(event.target.value)
        const name = event.target.name
        this.setState({
            [name] : event.target.value
        })
    }

      login = async (event) => {
        event.preventDefault()
        try {
          const user = await loginService.login({
            username: this.state.username,
            password: this.state.password
          })
      
          this.setState({ username: '', password: ''})
          courseService.setToken(user.token)
          this.props.setLoggedInUser(user) //Reactin stateen tallennettava user
          window.localStorage.setItem('user', JSON.stringify(user)) //local storageen tallennettava user
        } catch(exception) {
            alert("virheellinen käyttäjätunnus tai salasana!")
        }
      }

      handleLogOut = (event) => {
        event.preventDefault()

        console.log("deleting all user info from local cache")
        window.localStorage.clear()
        this.props.clearState()
        this.props.history.push("/");
        
      }


    render() {


        if(this.props.user === null){
            return (




                <Fragment>
                    <Grid item xs={12}>
                    <Paper style={{padding: 0, marginTop: 10, marginLeft: 10, marginRight: 10}}>
                    
                     


                            <FormControl style={{marginLeft: 10}}>
                                <InputLabel htmlFor="name-simple">Name</InputLabel>
                                <Input id="name-simple" type="text" name="username" value={this.state.username} onChange={(event) => this.handleFormChange(event)} />
                            </FormControl>




                        <FormControl style={{marginLeft: 10}} >
                            <InputLabel htmlFor="password-simple">Password</InputLabel>
                            <Input id="password-simple" type="password" name="password" value={this.state.password} onChange={(event) => this.handleFormChange(event)} />
                        </FormControl>
                    


                    <Button onClick={(e) => this.login(e)} style={{marginLeft: 20, marginBottom: 15, marginTop: 10}} size="small" variant="contained" color="primary" type="submit">Kirjaudu sisään</Button>

                
                </Paper>
                </Grid>
    </Fragment>





            )
        } else {
            return(
                <Fragment>
                    <Grid item xs={12}>
                <Paper style={{marginTop:10, paddingLeft: 10, marginLeft: 10, marginRight: 10, paddingTop: 1, paddingBottom: 1}}>
                <p>Kirjautunut käyttäjä: {this.props.user.username} <Button color="primary" variant="contained" onClick={(e) => this.handleLogOut(e)}>Kirjaudu ulos</Button></p>
                </Paper>
                </Grid>
                </Fragment>
            )
            
        }




}

}

export default withRouter(LoginForm);