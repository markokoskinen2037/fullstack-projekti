import React, { Fragment } from "react"
import userService from "../services/users"
import { withRouter } from "react-router-dom";

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography"


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

    createUser = async (event) => { 
        if(event){
            event.preventDefault()
        }
        let errors = 0;

          if(this.state.password.length < 5){
              this.props.showAlert("Salasanan tulee olla ainakin 5 merkkiä pitkä!")
              errors++;
          } else if(!this.state.email.includes("@")){
              this.props.showAlert("Sähköpostissa tulee olla @-merkki!")
              errors++;
          }

          if(errors === 0){
            try{
                await userService.create({
                    username: this.state.username,
                    password: this.state.password,
                    email : this.state.email
                  })
          
              this.setState({ username: '', password: '', email: ''})
              this.props.showAlert("Tunnuksen luonti onnistui!")
    
    
              } catch (e){
                this.props.showAlert("Ole hyvä ja valitse toinen käyttäjänimi!")
              }
    
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
                    <Grid item sm={6} md={6}>
                    <Paper style={{padding: 0, marginTop: 10, marginLeft: 10, marginRight: 10}}>
                      <Typography style={{marginLeft: 20, paddingTop: 20}} variant="display1">Rekisteröidy</Typography>
                    
                     

                    
                            <FormControl onKeyPress={(e) => this.handleEnter(e)}  style={{marginLeft: 20}}>
                                <InputLabel htmlFor="registerName-simple">Uusi Käyttäjätunnus</InputLabel>
                                <Input id="registerName-simple" type="text" name="username" value={this.state.username} onChange={(event) => this.handleFormChange(event)} />
                            </FormControl>




                        <FormControl onKeyPress={(e) => this.handleEnter(e)} style={{marginLeft: 20}} >
                            <InputLabel htmlFor="password-simple">Uusi Salasana</InputLabel>
                            <Input id="password-simple" type="password" name="password" value={this.state.password} onChange={(event) => this.handleFormChange(event)} />
                        </FormControl>

                        <FormControl onKeyPress={(e) => this.handleEnter(e)} style={{marginLeft: 20}} >
                            <InputLabel htmlFor="email-simple">Sähköposti</InputLabel>
                            <Input id="email-simple" type="text" name="email" value={this.state.email} onChange={(event) => this.handleFormChange(event)} />
                        </FormControl>
                    


                    <Button onClick={(e) => this.createUser(e)} style={{marginLeft: 20, marginBottom: 15, marginTop: 10, paddingLeft: 30, paddingRight: 30}} size="small" variant="contained" color="primary" type="submit">Luo tunnus</Button>

                
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