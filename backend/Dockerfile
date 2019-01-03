FROM ubuntu:16.04

RUN apt-get update && apt-get install -y curl && apt install -y git

RUN curl -sL https://deb.nodesource.com/setup_10.x | bash
RUN apt install -y nodejs

RUN git clone https://github.com/markokoskinen2037/fullstack-projekti.git

WORKDIR /fullstack-projekti/backend
RUN npm install

RUN touch .env

#Tämä tietokanta on testailua varten.
RUN echo 'MONGODB_URI=mongodb://admin:salasana1@ds155699.mlab.com:55699/devops_with_docker_2019' >> .env
RUN echo 'SECRET=testi' >> .env

CMD node index.js
EXPOSE 3001