# Opintojen aikatauluttaja
Projektini tavoitteena on kehittää yliopisto-opiskelijoille suunnattu aikataulutus järjestelmä auttamaan ajankäytön hallinnassa ja tavoitteiden asettamisessa.
#### Tärkeimpiä ominaisuuksia ovat:
- Meneillään olevien kurssien valinta
- Oman opiskelurytmin ja tavoitteiden asetus

#### Backend:
https://quiet-oasis-70395.herokuapp.com/

#### Lyhyen tähtäimen FRONTEND TODO:
- [ ] Toteuta kurssin CRUD-nelikkö
- [ ] Toteuta kirjautuminen (nimi,salasana,käyttäjänimi,sähköpostiosoite)
- [ ] Toteuta käyttäjäkohtainen kurssien priorisointi (haastavuus/tavoitearvosana/)



#### Lyhyen tähtäimen BACKEND TODO:
- [ ] Konfiguroi development pipeline
- [ ] Refaktoroi koodia omiin moduuleihinsa


#### Backendin käyttöohje
1. git clone
2. npm install
3. npm start

#### Frontendin käyttöohje
1. git clone
2. npm install
3. npm start

---
### Aikaa käytetty yhteensä noin : 8h
---


| Päivä     | Aika      | Tehty työ  |
| ----------|:---------:| :---------:|
|  14.3     | 2h10min     | Git repon pystytys, readmen teko ja aiheen valinta. Minimalistisen backendin toteutus, herokuun deployaus, readmen päivitys. Minimalistisen frontendin toteutus |
|  15.3     | 1h30min   | Backend käyttää MongoDB:tä. Fronttia voi käyttää nyt backend serverin kautta. Tietokantaa käyttävä backendin versio herokuun. Yms. heroku hommia |
|  22.3     | 1h45min     | Tietokannan käyttis ja salasana piiloon ympäristömuuttujiin. Konfiguroitu backendille eslint. Frontti käyttämään backendin tarjoamaa dataa. Seuraavien vaiheiden suunnittelua | 
|  29.5     | 1h        | Palattu projektin pariin 2kk tauon jälkeen. Aluksi joutui hieman kertailemaan asoita ja komentoja jotka olivat päässee unohtumaan. Lisätty tarkistukset kurssin kentille sitä luodessa. Yritetty saada React Routeria toimimaan, mutta bugeista johtuen suurin osa muutoksista poistettu.  |
|  31.5     | 3h30min   | Siirrytty kehittämään projektia windowsista ubuntulle, tässä ilmeni yllättäviä ongelmia joiden korjaaminen vaati hieman aikaa. Refaktoroitu backendin coursesRouter omaan tiedostoonsa. Korjattu tietokantayhteys MONGO-DB:hen. Siirrytty readmen ylläpidossa päiväkohtaiseen kirjanpitoon. Tehty etusivusta oma komponenttinsa. Otettu React Router käyttöön. Lisätty kurssin muokkaukselle linkki kurssilistaukseen. Lisätty kurssin muokkaussivulle kurssin tiedot.  |
|  1.6   | 2h45min | Yritetty toteuttaa kurssin muokkausta (1h45min), mutta staten muokkaaminen lapsikomponenteista käsin ei meinaa alkaa toimimaan. Lisätty kurssilistaukseen poisto-nappula ja toteutettu sen toiminnallisuus. |
|  3.6   | 3h | Toteutettu kurssin muokkaus. Korjattu kurssin poisto päivittymään heti. Kurssin muokkaus uudelleenohjaa nyt kurssilistaukseen. Toteutettu käyttäjän luominen backendissä. Aloitettu toteuttamaan käyttäjän ja kurssin välistä interaktiota backendissä.