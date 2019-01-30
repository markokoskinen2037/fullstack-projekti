import React, { Component } from 'react'

import { span, Tooltip } from '@material-ui/core'

export class DifficultyDisplay extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    let color = undefined

    switch (this.props.difficulty) {
      case 'Helppo':
        color = '#00bf00'
        break
      case 'Normaali':
        color = 'yellow'
        break
      case 'Haastava':
        color = '#ff8100'
        break
      case 'Vaikea':
        color = 'red'
        break
      default:
        color = 'black'
    }

    return (
      <span className="part1">
        <Tooltip title="Oma vaikeustaso / Vaikeustason keskiarvo (otoksen koko)">
          <span>
            {this.props.difficulty} / {this.props.courseMedian}
          </span>
        </Tooltip>
      </span>
    )
  }
}

export default DifficultyDisplay
