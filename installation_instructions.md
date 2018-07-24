### Asennusohjeet:
Ennen kuin aloitat asennusprosessin, varmista, että päätelaitteellasi on asennettu ```npm``` ja ```git```.

Asennetaan ensin **backend** seuraavasti:
1. Kloonaa tämä repositio omalle koneellesi
2. Navigoi kansioon ```fullstack-projekti/backend```
3. Suorita komento``` npm install```
4. Luo kansioon jossa juuri olet (fullstack-projekti/backend) tiedosto ```.env``` ja aseta sinne **oma MONGODB tietokantasi osoite** ja **mikä tahansa** arvo ympäristömuuttujalle SECRET.
**Alla esimerkki .env tiedoston sisällöstä:**
```
MONGODB_URI=mongodb://username:password1@databaseAddress:port/databaseName
SECRET=Mikä tahansa oma keksimä merkkijono
```
5. Aja komento ```npm start```
6. Jos kaikki meni hyvin, näkyy komentorivillä ilmoitus: ```"Server running on port 3001"```

Käyttäen **samaa** juuri kloonaamaasi repositiota, asennetaan myös **frontend** seuraavasti:
1. Mene hakemistossa ylös kansioon ```../fullstack-projekti/frontend/aikatauluttaja```
2. Aja komento ```npm install```
3. Aja komento ```npm start```
4. Jos kaikki meni hyvin, näkyy konsolissa ilmoitus ```"Compiled successfully!"```, ja aiemmin asentamaasi backendia käyttävä React sovellus aukeaa oletusselaimessasi automaattisesti.

- Backendiin pääset omalla koneellasi menemällä osoitteeseen: [localhost:3000/api](http://localhost:3001/api)
- Vastaavasti frontend löytyyy osoitteesta: [localhost:3000](http://localhost:3000)
