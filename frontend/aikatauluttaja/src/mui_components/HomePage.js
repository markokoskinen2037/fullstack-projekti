import React, { Fragment } from 'react'

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';


class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
}

  


   render () {
     if(this.props.user === null){
       return ( //Etusivu, kirjautumaton käyttäjä



        <Fragment>
            <Grid item xs={12} lg={8} md={12}>

                <Paper style={{padding: 10, marginTop: 10, marginLeft: 10, marginRight: 10}} elevation={4}>



                        <Typography variant="title" >Tervetuloa suunnitelemaan opintojasi!</Typography>
                        <Typography paragraph={true} variant="body1" >Ennen kuin pääset aloittamaan tulee sinun rekisteröityä järjestelmään.
                          Rekisteröitymällä
                          saat seuraavat ominaisuudet käyttöösi:
                          <br></br>
                          1. Kurssien lisääminen, muokkaaminen ja poistaminen.
                          <br></br>
                          2. Kurssien merkitseminen aktiivisiksi.
                        </Typography>



                        
                        
                </Paper>




                </Grid>
            </Fragment>








       )
     } else {
       return( //Etusivu, kirjatunut käyttäjä

        <Fragment>
            <Grid item md={6} xs={12}>

                <Paper style={{padding: 10, marginTop: 10, marginLeft: 10, marginRight: 10}} elevation={4}>



                        <Typography variant="title" >Tervetuloa suunnitelemaan opintojasi {this.props.user.username} !</Typography>
                        <Divider style={{marginTop: 5, marginBottom: 5}}/>
                        
                        <Typography paragraph={true} variant="body1" >Sinulla on x aktiivista kurssia jotka
                        suorittamalla saat y opintopistettä päivämäärään xx.xx.xxxx mennessä.
                        Tälle sivulle voisi lisätä esim. varoituksen jos opintoja vaikuttaa
                        olevan liian vähän ja kehuja jos opinnot vaikuttavat sujuvan aikataulujen mukaan.</Typography>        

                                     
                        
                </Paper>




                </Grid>



            </Fragment>

            




       )
     }
   }

}

export default HomePage