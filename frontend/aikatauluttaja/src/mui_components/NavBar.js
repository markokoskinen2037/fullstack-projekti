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
                <Toolbar>
                    <Typography variant="title" color="inherit">
                        Opintojen aikatauluttaja
                    </Typography>
                <Button color="inherit"><Link to="/">Etusivu</Link></Button>
                <Button to="/courses" color="inherit"><Link to="/courses">Kurssit</Link></Button>

                
                </Toolbar>
            </AppBar>
        )
    }
}

export default NavBar