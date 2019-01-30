# Docker

Sovellus koostuu backendistä ja frontendistä, molemmille on alikansioissaan olemassa omat Dockerfilet.
Lisäksi backendistä ja frontendistä on olemassa valmiit imaget:

- [frontend](https://hub.docker.com/r/markokoskinen2019/opintojenaikatauluttaja_frontend)
- [backend](https://hub.docker.com/r/markokoskinen2019/opintojenaikatauluttaja_backend)

Näitä imageita käyttävä docker-compose konfiguraatio löytyy reposition juuresta.

## Sovellus on helppo asentaa Dockerin avulla seuraavasti:

1. Asenna [docker](https://docs.docker.com/install/)
2. Asenna [docker-compose](https://docs.docker.com/compose/install/)
3. `wget https://github.com/markokoskinen2037/fullstack-projekti/raw/master/docker-compose.yml`
4. `docker-compose up`

#### Asennuksen jälkeen:

- Backendiin pääset omalla koneellasi menemällä osoitteeseen: [localhost:3000/api](http://localhost:3001/api)
- Vastaavasti frontend löytyyy osoitteesta: [localhost:3000](http://localhost:3000)
