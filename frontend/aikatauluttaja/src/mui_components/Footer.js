import React, { Component, Fragment } from 'react'
import { Paper, Typography } from '@material-ui/core'

export default class Footer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      visibility: 'visible',
    }
  }

  hide = () => [
    this.setState({
      visibility: 'hidden',
    }),
  ]

  render() {
    return (
      <Fragment>
        <Paper
          style={{
            backgroundColor: '#4056b6',
            marginTop: 100,
            width: '100%',
            padding: 2,
            textAlign: 'center',
            bottom: 0,
            height: 100,
            left: 0,
            position: 'relative',
            visibility: this.state.visibility,
          }}
        >
          <Typography variant="body1" style={{ color: 'white', marginTop: 19 }}>
            Marko Koskinen
            <br />
            <a
              style={{ color: 'white' }}
              href="mailto:marko.j.koskinen@helsinki.fi"
            >
              marko.j.koskinen@helsinki.fi
              <br />
            </a>
            <a
              style={{ color: 'white' }}
              href="https://github.com/markokoskinen2037/fullstack-projekti"
            >
              Github-repository
            </a>
          </Typography>
        </Paper>
      </Fragment>
    )
  }
}
