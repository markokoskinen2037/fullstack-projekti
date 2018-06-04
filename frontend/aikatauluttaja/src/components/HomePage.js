import React from 'react'

class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
}


  render () {
    if(this.props.user === null){
      return ( //Etusivu, kirjautumaton käyttäjä
        <div>
            <h2>Tervetuloa suunnittelemaan opintojasi!</h2>
            <p>Ennen kuin pääset aloittamaan opintojen suunnittelun tulee sinun rekisteröityä, jotta tietosi pysyvät tallessa.</p>
            
            <h3>Toivotut ominaisuudet:</h3>
            <ul>
              <li>Kurssien merkitseminen aktiivisiksi</li>
              <li>Kurssikohtainen tavoitteiden asetus</li>
              <li>Oman opiskelurytmin tallennus</li>
              
            </ul>
        </div>
      )
    } else {
      return( //Etusivu, kirjatunut käyttäjä
        <div>
          <h2>Tervetuloa suunnittelemaan opintojasi {this.props.user.username}</h2>
          <ul>
            <li>Sinulla on x aktiivista kurssia jotka suorittamalla saat y opintopistettä päivämäärään xx.xx.xxxx mennessä.</li>
            <li>Tälle sivulle voisi lisätä esim. varoituksen jos opintoja vaikuttaa olevan liian vähän ja kehuja jos opinnot vaikuttavat sujuvan aikataulujen mukaan.</li>
          </ul>
        </div>
      )
    }
  }

}

export default HomePage