import React, { Fragment } from 'react'
import userService from '../services/users'
import { withRouter } from 'react-router-dom'

import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import loginService from '../services/login'
import courseService from '../services/courses'

class RegisterForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      email: '',
    }
  }

  handleFormChange(event) {
    const name = event.target.name
    this.setState({
      [name]: event.target.value,
    })
  }

  createUser = async event => {
    function validateEmail(email) {
      //Löydetty netistä : https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
      var re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(email).toLowerCase())
    }

    if (event) {
      event.preventDefault()
    }
    let errors = 0

    if (this.state.password.length < 5) {
      this.props.showAlert('Salasanan tulee olla ainakin 5 merkkiä pitkä!')
      errors++
    } else if (validateEmail(this.state.email) === false) {
      this.props.showAlert('Sähköpostiosoitteesi ei kelvannut.')
      errors++
    }

    if (errors === 0) {
      try {
        await userService.create({
          //Kokeillaan luoda user, onnistuu jos username on vapaana.
          username: this.state.username,
          password: this.state.password,
          email: this.state.email,
        })

        alert(
          'Tunnuksen luonti onnistui! Sinut kirjataan automaattisesti sisään!'
        )
      } catch (e) {
        //Username ei ollut vapaa joten näytään error
        this.props.showAlert('Ole hyvä ja valitse toinen käyttäjänimi!')
      }

      //Jos tunnuksen luonti onnistui, kirjataan käyttäjä samantien sisään.
      const dataFromBackEnd = await loginService.login({
        //DatafromBackEnd sisältää user olion ja token stringin.
        username: this.state.username,
        password: this.state.password,
      })
      this.setState({ username: '', password: '', email: '' })

      courseService.setToken(dataFromBackEnd.token) //Asetetaan courseServicelle token muistiin
      this.props.setLoggedInUser(dataFromBackEnd.user) //Reactin stateen tallennettava user
      window.localStorage.setItem('user', JSON.stringify(dataFromBackEnd.user)) //local storageen tallennettava user ja token!
      const greeting =
        'Kirjauduit sisään käyttäjällä: ' + dataFromBackEnd.user.username
      this.props.showAlert(greeting)

      this.props.history.push('/courses')
    }
  }

  handleEnter = e => {
    if (e.which === 13) {
      this.createUser(e)
    }
  }

  render() {
    if (this.props.user === null) {
      return (
        <Fragment>
          <Grid item sm={12} md={8} style={{ margin: 'auto' }}>
            <Paper
              style={{
                padding: 0,
                marginTop: 10,
                marginLeft: 10,
                marginRight: 10,
              }}
            >
              <Typography
                style={{ marginLeft: 20, paddingTop: 20 }}
                variant="display1"
              >
                Rekisteröidy
              </Typography>

              <FormControl
                onKeyPress={e => this.handleEnter(e)}
                style={{ marginLeft: 20 }}
              >
                <InputLabel htmlFor="registerName-simple">
                  Uusi Käyttäjätunnus
                </InputLabel>
                <Input
                  id="registerName-simple"
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={event => this.handleFormChange(event)}
                />
              </FormControl>

              <FormControl
                onKeyPress={e => this.handleEnter(e)}
                style={{ marginLeft: 20 }}
              >
                <InputLabel htmlFor="password-simple">Uusi Salasana</InputLabel>
                <Input
                  id="password-simple"
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={event => this.handleFormChange(event)}
                />
              </FormControl>

              <FormControl
                onKeyPress={e => this.handleEnter(e)}
                style={{ marginLeft: 20 }}
              >
                <InputLabel htmlFor="email-simple">Sähköposti</InputLabel>
                <Input
                  id="email-simple"
                  type="text"
                  name="email"
                  value={this.state.email}
                  onChange={event => this.handleFormChange(event)}
                />
              </FormControl>

              <Button
                onClick={e => this.createUser(e)}
                style={{
                  marginLeft: 20,
                  marginBottom: 15,
                  marginTop: 10,
                  paddingLeft: 30,
                  paddingRight: 30,
                }}
                size="small"
                variant="contained"
                color="primary"
                type="submit"
              >
                Luo tunnus
              </Button>
            </Paper>
          </Grid>
        </Fragment>
      )
    } else {
      return null
    }
  }
}

export default withRouter(RegisterForm)
