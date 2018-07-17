import React, { Component, Fragment } from 'react'
import { Paper, Typography } from "@material-ui/core"


export default class Footer extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <Fragment>
                <Paper style={{ marginTop: 100, width: "100%", padding: 2, textAlign: "center", bottom: 0, left: 0, position: "fixed" }}>
                    <Typography variant="body1">
                        Author: Marko Koskinen | Contact information: <a href="mailto:marko.j.koskinen@helsinki.fi">marko.j.koskinen@helsinki.fi</a> | <a href="https://github.com/markokoskinen2037/fullstack-projekti">GITHUB</a>
                    </Typography>
                </Paper>
            </Fragment>
        )
    }
}
