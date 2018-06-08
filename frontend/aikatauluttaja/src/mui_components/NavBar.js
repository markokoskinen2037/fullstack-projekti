import React from "react"
import {Link} from "react-router-dom"

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';




class NavBar extends React.Component {
    constructor(props){
        super(props)
        this.state={

        }
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

            



                
                </Toolbar>
            </AppBar>
        )
    }
}

export default NavBar