import React, { Component, Fragment } from 'react'
import {Paper, Typography} from "@material-ui/core"


export default class Footer extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         
      }
    }
    
  render() {
    return (
        <Fragment>
            <Paper style={{marginTop: 100, width: "100%", padding:20, textAlign: "center", position: "absolute", bottom: "0px"}}>
            <Typography variant="body1">
                Author: Marko Koskinen | Contact information: <a href="mailto:marko.j.koskinen@helsinki.fi">marko.j.koskinen@helsinki.fi</a>
            </Typography>
            </Paper>
        </Fragment>
    )
  }
}
