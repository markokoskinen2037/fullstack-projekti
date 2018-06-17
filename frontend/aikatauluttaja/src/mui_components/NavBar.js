import React, {Fragment} from "react"
import {Link} from "react-router-dom"

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { withRouter } from "react-router-dom";







class NavBar extends React.Component {
    constructor(props){
        super(props)
        this.state={

        }
    }

    handleLogOut = (event) => {
        event.preventDefault()

        console.log("deleting all user info from local cache")
        window.localStorage.clear()
        this.props.clearState()
        this.props.history.push("/");

        this.props.showAlert("Uloskirjautuminen onnistui!")
        
      }



    render(){



        return(
            <AppBar position="static">
                <Toolbar style={{marginTop: 10}}>
                    <Typography variant="title" color="inherit">
                        Opintojen aikatauluttaja
                    </Typography>
                <Button style={{marginLeft: 20}} color="inherit"><Link style={{ color: '#FFF', textDecoration: 'none' }} to="/">Etusivu</Link></Button>
                <Button color="inherit"><Link style={{ color: '#FFF', textDecoration: 'none' }} to="/courses">Kurssit</Link></Button>


                <Button color="inherit"><a style={{color : '#FFF', textDecoration: 'none'}} href="https://github.com/markokoskinen2037/fullstack-projekti">GitHub</a></Button>

                {this.props.user !== null && this.props.user.username === "admin" && <Button style={{marginLeft: 20}} color="inherit"><Link style={{ color: '#FFF', textDecoration: 'none' }} to="/supersecretadminpage">SuperSecretAdminPage</Link></Button>}
                


                {this.props.user ? (
                <Fragment>
                    <Grid item md={12} >
                      <Typography align="right">
                      <Button disabled={false} style={{marginRight: 10}} color="inherit"><Link to="/userinfo" style={{ color: '#FFF', textDecoration: 'none' }}>{this.props.user.username}</Link></Button>
                      <Button onClick={(e) => this.handleLogOut(e)} variant="raised" color="default"> Kirjaudu ulos</Button></Typography>
                    </Grid>
                </Fragment>
                ): (
                    null
                )}
                



                
                </Toolbar>
            </AppBar>
        )
    }
}

export default withRouter(NavBar)