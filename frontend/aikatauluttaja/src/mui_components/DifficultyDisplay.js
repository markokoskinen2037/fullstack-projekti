import React, { Component, Fragment } from 'react'

import { span, Tooltip } from '@material-ui/core'

import '../styles/difficultyDisplay.css'

export class DifficultyDisplay extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    let background_Color = undefined

    // Choose according difficulty color
    switch (this.props.difficulty) {
      case 'Helppo':
        background_Color = '#00bf00c2'
        break
      case 'Normaali':
        background_Color = '#ffff00b8'
        break
      case 'Haastava':
        background_Color = '#ff8d00c7'
        break
      case 'Vaikea':
        background_Color = '#ff0000bf'
        break
      default:
        background_Color = 'white'
    }

    return (
      <Fragment>
        <Tooltip title="Oma vaikeustaso / Vaikeustason keskiarvo (otoksen koko)">
          <span
            className="difficultyDisplay"
            style={{
              backgroundColor: background_Color,
            }}
          >
            {this.props.difficulty} / {this.props.courseMedian}
          </span>
        </Tooltip>
      </Fragment>
    )
  }
}

export default DifficultyDisplay
