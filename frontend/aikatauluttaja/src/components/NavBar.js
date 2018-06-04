import React from "react"
import {Link} from "react-router-dom"

class NavBar extends React.Component {
    constructor(props){
        super(props)
        this.state={

        }
    }

    render(){
        return(
            <div>
            <Link to="/">Etusivu</Link>
            <Link to="/courses">Kurssit</Link>
            </div>
        )
    }
}

export default NavBar