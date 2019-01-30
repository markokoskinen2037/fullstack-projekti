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
            position: 'absolute',
            bottom: 0,
            width: '100%',
            backgroundColor: '#4056b6',
            borderRadius: 0,
            textAlign: 'center',
            height: 70,
          }}
        >
          <Typography variant="body1" style={{ color: 'white', marginTop: 5 }}>
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
