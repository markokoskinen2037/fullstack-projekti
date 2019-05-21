# Opintojen aikatauluttaja
[![Build Status](https://travis-ci.org/markokoskinen2037/fullstack-projekti.svg?branch=master)](https://travis-ci.org/markokoskinen2037/fullstack-projekti)

Projektini tavoitteena on kehittää yliopisto-opiskelijoille suunnattu aikataulutus järjestelmä auttamaan ajankäytön hallinnassa ja tavoitteiden asettamisessa.

#### Ominaisuudet

- Kurssien luominen, tarkastelu, muokkaus ja poisto
- Tunnuksen luominen ja sovellukseen kirjautuminen
- Meneillään olevien kurssien valinta
- Kurssikohtainen vaikeustason ja tavoitteiden määrittely
- Automaattiset työpäiväkohtaiset tuntiarviot jotka painotetaan käyttäjän kurssille asettaman vaikeustason perusteella.

#### Testien ajo omalla koneella
- ***Voit ajaa testit omalla koneellasi, kunhan asennat ensin sovelluksen asennusohjeiden mukaisesti - [Linkki asennusohjeisiin (npm + node)](https://github.com/markokoskinen2037/fullstack-projekti/blob/master/installation_instructions.md) (***
- Sovellukseen on toteutettu cypress end-to-end testejä, jotka löytyvät kansiosta `frontend/cypress/`
- Testit voidaan ajaa npm scriptillä frontend-kansiosta, komennolla `npm run test`
- Testit tuottavat html muotoisen, kauniisti formatoidun raportti tiedoston, joka löytyy kansiosta `/frontend/cypress/results/mochawesome-report/`

#### Huomioita lukijalle:

- [Linkki asennusohjeisiin (npm + node)](https://github.com/markokoskinen2037/fullstack-projekti/blob/master/installation_instructions.md)
- [Vaihtoehtoinen asennusohje (docker)](https://github.com/markokoskinen2037/fullstack-projekti/blob/master/docker_instructions.md)
- [Tuntikirjanpito](https://github.com/markokoskinen2037/fullstack-projekti/blob/master/tuntikirjanpito.md)
- Koska sovellus toimii kuten mikä tahansa muu nettisivu, ei erillistä käyttöohjetta asennusohjeiden lisäksi mielestäni tarvita.
- Sovellus löytyy osoitteesta: https://opintojenaikatauluttaja.herokuapp.com/
- ja sen backend: https://opintojenaikatauluttaja.herokuapp.com/api/

![Kurssilistaus](/readme_images/kurssilistaus.png)
