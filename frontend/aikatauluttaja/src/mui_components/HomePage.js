import React, { Fragment } from 'react'

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';


import userService from "../services/users"


class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      totalCredits: 0,
      user: undefined
    }
}

  

componentDidMount(){
  if(window.localStorage.getItem("user") !==  null){
    const userFromLocalStorage = JSON.parse(window.localStorage.getItem("user"));
    console.log(userFromLocalStorage._id)
    console.log("Getting user info from backend");
    userService
      .get(userFromLocalStorage._id)
      .then(user => {
        this.setState({user})
        console.log("Got user from backend!")
        console.table(this.state.user)
      })
      .then(res => {
  
        //Lasketaan paljonko on aktiivisten kurssien opintopisteiden summa ja tallennetaan tulos stateen
        let sum = 0;
        this.state.user.activeCourses.map(course => {
          sum = sum+course.credits;
        })
        this.setState({totalCredits : sum})
  
        
  
  
  
      })

  }


    
}



   render () {
     if(this.props.user === null){
       return ( //Etusivu, kirjautumaton käyttäjä



        <Fragment>
            <Grid item xs={12} lg={12} md={12}>

                <Paper style={{padding: 10, marginTop: 10, marginLeft: 10, marginRight: 10}} elevation={4}>



                        <Typography style={{padding: "10px"}} variant="headline" >Tervetuloa suunnitelemaan opintojasi!</Typography>
                        <Typography style={{marginLeft: "10px"}} paragraph={true} variant="body1" >
                          Ennen kuin pääset aloittamaan tulee sinun rekisteröityä järjestelmään.
                          Rekisteröityminen vaatii vain käyttäjätunnuksen, salasanan ja sähköpostin.
                          Rekisteröitymisen jälkeen voit kirjautua sisään ja testata seuraavia ominaisuuksia:
                          <br></br>
                          <br></br>
                          Kurssin lisäys, muokkaus ja poisto.
                          <br></br>
                          Kurssilistauksen tarkastelu, haku ja aktiivisuuden perusteella filtteröinti.
                          <br></br>
                          Kurssikohtaisten tavoitteiden asettaminen ja haastavuuksien määrittäminen ja muokkaus.
                          <br></br>
                          Automaattiset opintoaikasuositukset kurssille asettaman vaikeusasteen perusteella
                      


                        </Typography>



                        
                        
                </Paper>




                </Grid>
            </Fragment>








       )
     } else if (this.state.user !== undefined) {





      //console.table(this.props.user)


       return( //Etusivu, kirjatunut käyttäjä

        <Fragment>



                    <Grid item md={6} xs={12}>
                        <Paper style={{padding: 10, marginTop: 10, marginLeft: 10, marginRight: 10}} elevation={1}>
                           <Typography variant="title" >Tervetuloa suunnitelemaan opintojasi {this.state.user.username} !</Typography>
                           <Divider style={{marginTop: 5, marginBottom: 5}}/>
                                
                            <ul>
                              <li>Sinulla on <b>{this.props.user.activeCourses.length}</b> aktiivista kurssia.</li>
                              <li>Kyseiset kurssit suorittamalla ansaitset yhteensä <b>{this.state.totalCredits}</b> opintopistettä.</li>
                              <li>Olet määrittänyt <b>{this.state.user.goals.length}</b> kurssitavoitetta </li>
                           </ul>
                        </Paper>
                    </Grid>

                    <Grid item md={6} xs={12}>
                      <Paper style={{padding: 10, marginTop: 10, marginLeft: 10, marginRight: 10}} elevation={1}>
                      <Typography paragraph={true} variant="body1">
                        Vuosittainen tavoiteopintopistemäärä on 60 op. <br></br>
                        Pakollinen opintojen suoritusmäärä lukuvuotta kohden 1.8-31.7 on 20 op. <br></br>
                        {this.state.totalCredits < 60 && "Vaikuttaa siltä, että et ole vielä suunnitellut 60 opintopisteen edestä opintoja tälle vuodelle."}
                        <br></br>
                        {this.state.totalCredits < 20 && " Vaikuttaa siltä, että opintosi eivät riitä 20 opintopisteen tavoitteeseen."}
                      </Typography>
                      </Paper>
                    </Grid>

                    <Grid item md={6} xs={12}>
                      <Paper style={{padding: 10, marginTop: 10, marginLeft: 10, marginRight: 10}} elevation={1}>
                      <Typography paragraph={true} variant="body1">
                        <a target="_blank" href="https://www.cs.helsinki.fi/courses">Tietojenkäsittelytieteen laitoksen kurssitarjonta</a>
                        <br></br>
                        <a target="_blank" href="https://wiki.helsinki.fi/pages/viewpage.action?pageId=244747659">Matematiikan ja tilastotieteen laitoksen kurssitarjonta</a>
                      </Typography>
                      </Paper>
                    </Grid>



          </Fragment>

            




       )
     } else {
       return null;
     }
   }

}

export default HomePage