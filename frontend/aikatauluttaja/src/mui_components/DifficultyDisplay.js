import React, { Component, Fragment } from 'react'

import { Button, Typography } from "@material-ui/core"

export class DifficultyDisplay extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {

        let color = undefined;

        switch (this.props.difficulty) {
            case "Helppo":
                color = "green"
                break;
            case "Normaali":
                color = "yellow"
                break;
            case "Haastava":
                color = "#ff8100"
                break;
            case "Vaikea":
                color = "red"
                break;
            default:
                console.log("Undefined color");

        }



        return (
            <Fragment>
                <Button disabled={true} mini={true} size="small" variant="outlined" style={{ marginRight: "20px", backgroundColor: color }}><Typography style={{ width: "200px", color: "black", fontWeight: 100 }} variant="body1">{this.props.difficulty} / {this.props.courseMedian}</Typography></Button>
            </Fragment>
        )
    }
}

export default DifficultyDisplay
