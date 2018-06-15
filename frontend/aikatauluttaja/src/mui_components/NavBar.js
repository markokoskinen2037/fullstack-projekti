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


                {this.props.user ? (
                <Fragment>
                    <Grid item md={12} >
                      <Typography align="right"><Button onClick={(e) => this.handleLogOut(e)} variant="raised" color="default">{this.props.user.username} | Kirjaudu ulos</Button></Typography>
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