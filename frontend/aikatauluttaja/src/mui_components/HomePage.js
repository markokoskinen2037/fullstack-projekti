import React, { Fragment } from 'react'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

import userService from '../services/users'

class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      totalCredits: 0,
      user: undefined,
    }
  }

  componentDidMount() {
    if (this.props.user === null) {
      if (window.localStorage.getItem('user') !== null) {
        const userFromLocalStorage = JSON.parse(
          window.localStorage.getItem('user')
        )

        userService
          .get(userFromLocalStorage._id)
          .then(user => {
            this.setState({ user })
            console.table(this.state.user)
          })
          .then(res => {
            //Lasketaan paljonko on aktiivisten kurssien opintopisteiden summa ja tallennetaan tulos stateen
            let sum = 0
            this.state.user.activeCourses.map(course => {
              sum = sum + course.credits
              return sum
            })
            this.setState({ totalCredits: sum })
          })
      }
    } else {
      //Saatiin user olio propsina joten käytetään sitä.
      this.setState({ user: this.props.user })

      let sum = 0
      this.props.user.activeCourses.map(course => {
        sum = sum + course.credits
        return sum
      })
      this.setState({ totalCredits: sum })
    }
  }

  render() {
    if (this.props.user === null) {
      //Jos user on null, renderöidään kirjautumattoman käyttäjän etusivu:
      return (
        <Fragment>
          <Grid item xs={12} md={8} style={{ margin: 'auto' }}>
            <Paper
              style={{
                margin: 'auto',
                padding: 10,
                marginTop: 10,
                marginLeft: 10,
                marginRight: 10,
              }}
              elevation={4}
            >
              <Typography style={{ padding: '10px' }} variant="headline">
                Tervetuloa suunnitelemaan opintojasi!
              </Typography>

              <Typography
                style={{ marginLeft: '10px' }}
                paragraph={true}
                variant="body1"
              >
                Ennen kuin pääset aloittamaan tulee sinun rekisteröityä
                järjestelmään. Rekisteröityminen vaatii vain käyttäjätunnuksen,
                salasanan ja sähköpostin. Rekisteröitymisen jälkeen voit
                kirjautua sisään ja testata seuraavia ominaisuuksia: Kurssin
                lisäys, muokkaus ja poisto. Kurssilistauksen tarkastelu, haku ja
                aktiivisuuden perusteella filtteröinti. Kurssikohtaisten
                tavoitteiden asettaminen ja haastavuuksien määrittäminen ja
                muokkaus. Automaattiset opintoaikasuositukset kurssille
                asettaman vaikeusasteen perusteella
              </Typography>
            </Paper>
          </Grid>
        </Fragment>
      )
    } else if (this.state.user !== undefined) {
      //Jos käyttäjä ole olemassa, rendöidään sen tiedot ja suosituksia yms.
      return (
        <Fragment>
          <Typography
            style={{ textAlign: 'center', marginBottom: 20 }}
            variant="display1"
          >
            Moi, {this.state.user.username}!
          </Typography>

          <Grid item md={6} xs={12} style={{ margin: 'auto' }}>
            <Paper style={{ padding: 30, marginTop: 20 }} elevation={1}>
              <Typography paragraph={true} variant="body1">
                Sinulla on {this.props.user.activeCourses.length} aktiivista
                kurssia.
                <br />
                Kyseiset kurssit suorittamalla ansaitset yhteensä{' '}
                {this.state.totalCredits} opintopistettä.
                <br />
                Olet määrittänyt {
                  this.state.user.goals.length
                } kurssitavoitetta{' '}
              </Typography>
            </Paper>
          </Grid>

          <Grid item md={6} xs={12} style={{ margin: 'auto' }}>
            <Paper style={{ padding: 30, marginTop: 20 }} elevation={1}>
              <Typography paragraph={true} variant="body1">
                Vuosittainen tavoiteopintopistemäärä on 60 op. <br />
                Pakollinen opintojen suoritusmäärä lukuvuotta kohden 1.8-31.7 on
                20 op. <br />
                {this.state.totalCredits < 60 &&
                  'Vaikuttaa siltä, että et ole vielä suunnitellut 60 opintopisteen edestä opintoja tälle vuodelle.'}
                <br />
                {this.state.totalCredits < 20 &&
                  ' Vaikuttaa siltä, että opintosi eivät riitä 20 opintopisteen tavoitteeseen.'}
              </Typography>
            </Paper>
          </Grid>

          <Grid item md={6} xs={12} style={{ margin: 'auto' }}>
            <Paper style={{ padding: 30, marginTop: 20 }} elevation={1}>
              <Typography paragraph={true} variant="body1">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.cs.helsinki.fi/courses"
                >
                  Tietojenkäsittelytieteen laitoksen kurssitarjonta
                </a>
                <br />
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://wiki.helsinki.fi/pages/viewpage.action?pageId=244747659"
                >
                  Matematiikan ja tilastotieteen laitoksen kurssitarjonta
                </a>
              </Typography>
            </Paper>
          </Grid>
        </Fragment>
      )
    } else {
      return null
    }
  }
}

export default HomePage
