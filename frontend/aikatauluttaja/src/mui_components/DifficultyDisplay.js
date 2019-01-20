import React, { Component, Fragment } from "react";

import { Typography, Tooltip } from "@material-ui/core";

export class DifficultyDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let color = undefined;

    switch (this.props.difficulty) {
      case "Helppo":
        color = "#00bf00";
        break;
      case "Normaali":
        color = "yellow";
        break;
      case "Haastava":
        color = "#ff8100";
        break;
      case "Vaikea":
        color = "red";
        break;
      default:
        console.log("Undefined color");
    }

    return (
      <Fragment>
        <Tooltip title="Oma vaikeustaso / Vaikeustason keskiarvo (otoksen koko)">
          <Typography
            style={{
              marginRight: 10,
              borderRadius: 20,
              padding: 10,
              width: 200,
              textAlign: "center",
              color: "black",
              backgroundColor: color,
              fontWeight: 100
            }}
            variant="body1"
          >
            {this.props.difficulty} / {this.props.courseMedian}
          </Typography>
        </Tooltip>
      </Fragment>
    );
  }
}

export default DifficultyDisplay;
