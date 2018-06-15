# Opintojen aikatauluttaja
Projektini tavoitteena on kehittää yliopisto-opiskelijoille suunnattu aikataulutus järjestelmä auttamaan ajankäytön hallinnassa ja tavoitteiden asettamisessa.
#### Tärkeimpiä ominaisuuksia ovat:
- Meneillään olevien kurssien valinta
- Oman opiskelurytmin ja tavoitteiden asetus

#### Backend:
https://obscure-bayou-13604.herokuapp.com/

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
### Aikaa käytetty yhteensä noin : 31h
---


| Päivä     | Aika      | Tehty työ  |
| ----------|:---------:| :---------:|
|  14.3     | 2h10min     | Git repon pystytys, readmen teko ja aiheen valinta. Minimalistisen backendin toteutus, herokuun deployaus, readmen päivitys. Minimalistisen frontendin toteutus |
|  15.3     | 1h30min   | Backend käyttää MongoDB:tä. Fronttia voi käyttää nyt backend serverin kautta. Tietokantaa käyttävä backendin versio herokuun. Yms. heroku hommia |
|  22.3     | 1h45min     | Tietokannan käyttis ja salasana piiloon ympäristömuuttujiin. Konfiguroitu backendille eslint. Frontti käyttämään backendin tarjoamaa dataa. Seuraavien vaiheiden suunnittelua | 
|  29.5     | 1h        | Palattu projektin pariin 2kk tauon jälkeen. Aluksi joutui hieman kertailemaan asoita ja komentoja jotka olivat päässee unohtumaan. Lisätty tarkistukset kurssin kentille sitä luodessa. Yritetty saada React Routeria toimimaan, mutta bugeista johtuen suurin osa muutoksista poistettu.  |
|  31.5     | 3h30min   | Siirrytty kehittämään projektia windowsista ubuntulle, tässä ilmeni yllättäviä ongelmia joiden korjaaminen vaati hieman aikaa. Refaktoroitu backendin coursesRouter omaan tiedostoonsa. Korjattu tietokantayhteys MONGO-DB:hen. Siirrytty readmen ylläpidossa päiväkohtaiseen kirjanpitoon. Tehty etusivusta oma komponenttinsa. Otettu React Router käyttöön. Lisätty kurssin muokkaukselle linkki kurssilistaukseen. Lisätty kurssin muokkaussivulle kurssin tiedot.  |
|  1.6   | 2h45min | Yritetty toteuttaa kurssin muokkausta (1h45min), mutta staten muokkaaminen lapsikomponenteista käsin ei meinaa alkaa toimimaan. Lisätty kurssilistaukseen poisto-nappula ja toteutettu sen toiminnallisuus. |
|  3.6   | 3h | Toteutettu kurssin muokkaus. Korjattu kurssin poisto päivittymään heti. Kurssin muokkaus uudelleenohjaa nyt kurssilistaukseen. Toteutettu käyttäjän luominen backendissä. Aloitettu toteuttamaan käyttäjän ja kurssin välistä interaktiota backendissä. |
| 4.6    | 3h30min | Kirjautumisen toteutus backendissä. Kirjautumisen toteuttaminen frontendissä. Kirjautuneen käyttäjän tallennus stateen. Refaktorointia. React komponenttien eriytystä omiin tiedostoihinsa. Ehdollinen renderöinti: Kirjautumaton käyttäjä saa vain lukea etusivua ja halutessaan kirjautua järjestelmään.  |
|  5.6  | 4h0min  | Parannettu kurssin päivitysnopeutta UI:ssa. Käyttäjää luodessa otetaan talteen myös email osoite. Muokattu login pyyntö palauttamaan kaikki tiedot käyttäjästä stateen (ml. _id, email ja activeCourses lista). Lisätty backendiin GET /users/:id joka palauttaa id:n mukaisen käyttäjän. Yritetty toteuttaa ominaisuus, jossa käyttäjä voi valita kurssilistauksesta kursseja ja ne rekisteröityvät hänen profiilinsa kohdalle activeCourses nimiseen listaan. Tämä ominaisuus toimii postmanin kautta kyselyitä tehdessä, mutta suoraan selaimesta nappia painamalla aktiiviset kurssit eivät suostu päivittymään tietokannassa... Käytännössä tämän päivän tunneista suurin osa meni tuon ongelman kanssa kamppailuun.  |
|  6.6  | 4h00min | Korjattu kurssin lisäys/poisto aktiivisten kurssien listalta. Laitettu backend palauttamaan kursseilla populoidut userit responsen mukana. Poistettu turhat console.log komennot. Saatu kurssin aktivoinnin togglettaminen toimimaan halutulla tavalla. Laitettu kurssin poistonäppäin päivittämään statea suoraan. Kurssia luodessa lähetetään authentication token (tokenin tarkastus puuttuu vielä backendistä) Kirjautuessa user tallennetaan selaimen local storageen. Toteutettu uloskirjautuminen (poistaa local storagesta userin ja react.state.userin). Perehdytty hieman Material Designin käyttöön. Otettu Material Design tuki käyttöön projektissa.|
|  7.6  | 4h15min | Luettu Material Designin dokumentaatiota (1h). Luotu uudet versiot komponenteista NavBar, LoginForm ja HomePage. Uudet versiot kyseisistä komponenteista käyttävät Material UI:ta ja ne on otettu käyttöön App.js:ssa. Luotu uusi versio myös komponentista Course. Lisätty Course komponenttiin siitä aiemmin unohtuneet course.credits ja course.length. Parannettu ui:ssa kaikenlaista pientä. Asetettu kurssilistauksessa kurssin aktivoinnille kiva responsiivinen tähtikuvake. |
|  8.6  | 4h15min | Parannettu useiden eri komponenttien ulkoasuja. Lisätty mui-formeihin ominaisuus: enteriä painettaessa lähetetään lomake. Toteutettu mui-versio kurssin muokkaus lomakkeesta. Poistettu linkeistä alleviivaukset. Parannettu sovelluksen toimivuutta eri kokoisilla näytöillä. Toteutettu rekisteröintilomake ja lisätty se etusivulle. Korjattu kurssin aktivoinnin kuvakkeet oikein päin. Luotu backendiin modeli ja kontrolleri Goalille, eli käyttäjän ja kurssin yhdistävään tietoalkioon. Lisätty goalin haun palauttamaan dataan populointia userilla ja kursseilla. Lisätty yksittäisen goalin haku. Toteutettu goalin poisto, päivitys, muokkaus ja haku. Pieniä käyttöliittymä muokkauksia.|
| 9.6 | 1h15min | Korjattu aktiiviset kurssit renderöitymään oikein kurssilistaukseen painettaessa F5:sta. Luotu fronttiin goal-service. Poistettu kaikki turhat importit. Goali luodessa goal._id tallennetaan userin goals-listaan. Alettu toteuttaa frontissa kurssikohtaisten tavoitteiden asetusta. |
| 13.6 | 4h0min | Painittu edelleen kurssikohtaisten tavoitteiden asettamisen kanssa. Onnistunut kirjautuminen tallentaa stateen koko käyttäjän ja tokenin. Korjattu kurssin aktivointi ja deaktivointi toimimaan myös f5 jälkeen. Estetty backendissä goal:ien dublikaatit. Luodaan renderöitäessä kursseja jokaiselle kurssille ja kirjautuneelle käyttäjälle "Goal" yhteys jos sellaista ei vielä ole tietokannassa. Lähtötavoitteeksi asetetetaan ykkösen arvosana. Paranneltu hieman ulkoasua. Luotu UserStatistics komponentti joka renderöidään etusivulla. |
| 14.6 | 3h0min| Refaktoroitu komponentti "Course" classiksi jotta sille sai oman staten. Estetty suoraan frontissa goalien dublikaatit. Poistettu eilen tehty ominaisuus "Luodaan renderöitäessä kursseja jokaiselle kurssille ja kirjautuneelle käyttäjälle "Goal" yhteys jos sellaista ei vielä ole tietokannassa.", koska kävi ilmi, että se rasittaa todella paljon backendiä jos sivulle renderöityy samaan aikaan esim. 20 kurssia. Tästä syystä toteutin Course komponentin uudestaan alusta alkaen. Nyt Course komponentti toimii ja sen avulla voi määrittää itselleen kurssikohtaisen tavoitearvosanan (1-5). Parannettu hieman ulkoasua. |
| 15.6 | 3h00min | Muistin että en ole puskenut herokuun uutta versiota ainakaan kuukauteen. Deployasin sovelluksen uudestaan Herokuun, jotta vanhat asetukset eivät rikkoisi mitään. Pienten ENV muuttujien asettelun jälkeen sovellus lähti toimimaan. Loin myös samalla pienen .sh skriptin joka buildaa frontista uuden version, kopioi sen backendiin, kopioi backendin sisällön erilliseen heroku-reposition kansioon, tekee uuden commitin ja puskee muutokset herokuun. Korjattu kurssilistauksen tavoitteiden renderöinti toimimaan myös ensimmäisellä renderöintikerralla. Toteutettu tavoitteen muokkaus komponenttiin EditCourse. Lisätty build kansiot gitignoreen. Toteutettu "virheenestoa", jotta käyttäjä ei näkisi esim. error koodeja vaan käyttäjä ohjataan erroriin johtavista tilanteista pois turvaan. |