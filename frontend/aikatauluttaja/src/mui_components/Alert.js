import React, { Component, Fragment } from 'react'

import {Paper, Typography, Grid} from "@material-ui/core"

export class Alert extends Component {




  render() {
    return (
        <Fragment >
            <Grid item md={12}>
            <Paper style={{marginRight: 20, marginLeft: 20, marginTop:20, padding: 10, }}>
                <Typography align="center">{this.props.content}</Typography>
            </Paper>
            </Grid>
        </Fragment>
    )
  }
}

export default Alert