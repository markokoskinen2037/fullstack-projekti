import React, { Fragment } from "react"
import userService from "../services/users"
import { withRouter } from "react-router-dom";

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';


class RegisterForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            email: ""
        }
    }

    handleFormChange(event){
        //console.log(event.target.value)
        const name = event.target.name
        this.setState({
            [name] : event.target.value
        })
    }

    createUser = async (event) => { //Fixaa tää
        if(event){
            event.preventDefault()
          }
        
        try {
          userService.create({
            username: this.state.username,
            password: this.state.password,
            email : this.state.email
          })
      
          this.setState({ username: '', password: '', email: ''})
          alert("new user created!")
        } catch(exception) {
            alert(exception)
        }
      }

    handleEnter = (e) => {
        //console.log(e.which)
        if(e.which === 13){
            this.createUser(e)
        }
      }


    render() {


        if(this.props.user === null){
            return (

                <Fragment>
                    <Grid item xl={3} md={4} sm={12} lg={3}>
                    <Paper style={{padding: 0, marginTop: 10, marginLeft: 10, marginRight: 10,}}>
                    
                     

                    
                            <FormControl onKeyPress={(e) => this.handleEnter(e)}  style={{marginLeft: 10}}>
                                <InputLabel htmlFor="registerName-simple">Uusi Käyttäjätunnus</InputLabel>
                                <Input id="registerName-simple" type="text" name="username" value={this.state.username} onChange={(event) => this.handleFormChange(event)} />
                            </FormControl>




                        <FormControl onKeyPress={(e) => this.handleEnter(e)} style={{marginLeft: 10}} >
                            <InputLabel htmlFor="password-simple">Uusi Salasana</InputLabel>
                            <Input id="password-simple" type="password" name="password" value={this.state.password} onChange={(event) => this.handleFormChange(event)} />
                        </FormControl>

                        <FormControl onKeyPress={(e) => this.handleEnter(e)} style={{marginLeft: 10}} >
                            <InputLabel htmlFor="email-simple">Sähköposti</InputLabel>
                            <Input id="email-simple" type="text" name="email" value={this.state.email} onChange={(event) => this.handleFormChange(event)} />
                        </FormControl>
                    


                    <Button onClick={(e) => this.createUser(e)} style={{marginLeft: 20, marginBottom: 15, marginTop: 10}} size="small" variant="contained" color="primary" type="submit">Luo tunnus</Button>

                
                </Paper>
                </Grid>
            </Fragment>





            )
        } else {
            return(null)
        }

}

}

export default withRouter(RegisterForm);