import React, { Fragment } from 'react'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

import userService from '../services/users'

import '../styles/homePage.css'

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
            <Paper className="simplePaper" elevation={4}>
              <Typography style={{ padding: '10px' }} variant="display1">
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
                kirjautua sisään ja testata seuraavia omiasasdnaisuuksia:
                Kurssin lisäys, muokkaus ja poisto. Kurssilistauksen tarkastelu,
                haku ja aktiivisuuden perusteella filtteröinti. Kurssikohtaisten
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
          <Typography className="greeting" variant="display1">
            Moi, {this.state.user.username}!
          </Typography>

          <div className="infoContainer">
            <Paper className="paperContent" elevation={1}>
              <Typography paragraph={true} variant="body1">
                Olet merkinnyt{' '}
                <span className="strongText">
                  {this.props.user.activeCourses.length}
                </span>{' '}
                kurssia suoritetuiksi.
                <br />
                Näistä kursseista olet ansainnut yhteensä{' '}
                <span className="strongText">{this.state.totalCredits} </span>
                opintopistettä.
                <br />
                Olet määrittänyt{' '}
                <span className="strongText">
                  {this.state.user.goals.length}
                </span>{' '}
                kurssitavoitetta{' '}
              </Typography>
            </Paper>

            <Paper className="infoContainer2" elevation={1}>
              <Typography paragraph={true} variant="body1">
                Vuosittainen tavoiteopintopistemäärä on 60 op. <br />
                Pakollinen opintojen suoritusmäärä lukuvuotta kohden 1.8-31.7 on
                20 op. <br />
                {this.state.totalCredits < 60 && (
                  <span style={{ textDecoration: 'underline' }}>
                    Vaikuttaa siltä, että et ole vielä suorittanut 60
                    opintopistettä tänävuonna.
                  </span>
                )}
                <br />
                {this.state.totalCredits < 20 && (
                  <span className="strongText">
                    Vaikuttaa siltä, että suorituksesi eivät täytä kelan 20
                    opintopisteen minimivaatimusta.
                  </span>
                )}
              </Typography>
            </Paper>

            <Paper className="infoContainer2" elevation={1}>
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
          </div>
        </Fragment>
      )
    } else {
      return null
    }
  }
}

export default HomePage
