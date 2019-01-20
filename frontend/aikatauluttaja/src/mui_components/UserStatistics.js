import React, { Component, Fragment } from 'react'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

class UserStatistics extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: this.props.getLoggedInUser(),
    }
  }

  render() {
    if (this.state.user === null) {
      return null
    } else {
      return (
        <Fragment>
          <Grid item md={6} xs={12}>
            <Paper
              style={{
                padding: 10,
                marginTop: 10,
                marginLeft: 10,
                marginRight: 10,
              }}
              elevation={4}
            >
              <Typography variant="headline">Käyttäjätietosi:</Typography>

              <div style={{ marginLeft: 10 }}>
                <Typography
                  style={{ marginTop: 20 }}
                  paragraph={true}
                  variant="body1"
                >
                  Käyttäjätunnus: {this.state.user.username}
                </Typography>
                <Typography paragraph={true} variant="body1">
                  Id: {this.state.user._id}
                </Typography>
                <Typography paragraph={true} variant="body1">
                  Sähköposti: {this.state.user.email}
                </Typography>
                <Typography paragraph={true} variant="body1">
                  Aktiivisia kursseja: {this.state.user.activeCourses.length}
                </Typography>
                <Typography paragraph={true} variant="body1">
                  Asetettuja tavoitteita: {this.state.user.goals.length}
                </Typography>
              </div>
            </Paper>
          </Grid>
        </Fragment>
      )
    }
  }
}

export default UserStatistics
