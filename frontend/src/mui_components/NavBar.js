import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import { AppBar, Toolbar } from '@material-ui/core'
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
        <Toolbar>
          <Link className="Link navBarItem" to="/">
            Home
          </Link>

          {this.props.user !== null && (
            <Link className="Link navBarItem" to="/courses">
              Courses
            </Link>
          )}

          {this.props.user !== null && this.props.user.username === 'admin' && (
            <Link className="Link nabBarItem" to="/supersecretadminpage">
              SUPERSECRETADMINPAGE
            </Link>
          )}

          {this.props.user ? (
            <Fragment>
              <Link className="Link navBarItem" to="/userinfo">
                Profile
              </Link>

              <Link style={{ position: "absolute", right: 10 }} className="Link navBarItem" to="/" onClick={e => this.handleLogOut(e)}>
                Logout
              </Link>



            </Fragment>
          ) : null}
        </Toolbar>
      </AppBar>
    )
  }
}

export default withRouter(NavBar)
