import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { withRouter } from 'react-router-dom'

import '../styles/NavBarStyle.css'

class NavBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleLogOut = event => {
    event.preventDefault()
    this.props.showAlert('Uloskirjautuminen onnistui!')

    window.localStorage.clear()
    this.props.clearState()

    this.props.history.push('/')
  }

  render() {
    return (
      <AppBar position="static">
        <Toolbar style={{ marginTop: 10 }}>
          <Typography variant="title" color="inherit">
            <Link className="Link" to="/">
              Opintojen aikatauluttaja
            </Link>
          </Typography>

          {this.props.user !== null && (
            <Link className="Link" to="/courses">
              Kurssilistaus
            </Link>
          )}

          {this.props.user !== null && this.props.user.username === 'admin' && (
            <Link className="Link" to="/supersecretadminpage">
              SUPERSECRETADMINPAGE
            </Link>
          )}

          {this.props.user ? (
            <Fragment>
              <Grid item style={{ position: 'absolute', right: '20px' }}>
                <Typography align="right">
                  <Link className="Link_username" to="/userinfo">
                    {this.props.user.username}
                  </Link>
                  <Button
                    onClick={e => this.handleLogOut(e)}
                    variant="raised"
                    color="default"
                  >
                    {' '}
                    Kirjaudu ulos
                  </Button>
                </Typography>
              </Grid>
            </Fragment>
          ) : null}
        </Toolbar>
      </AppBar>
    )
  }
}

export default withRouter(NavBar)
