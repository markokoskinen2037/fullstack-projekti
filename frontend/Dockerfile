FROM ubuntu:16.04

RUN apt-get update && apt-get install -y curl && apt install -y git

RUN curl -sL https://deb.nodesource.com/setup_10.x | bash
RUN apt install -y nodejs
RUN apt-get install vim -y

RUN echo Getting latest version...
RUN git clone https://github.com/markokoskinen2037/fullstack-projekti.git

WORKDIR /fullstack-projekti/frontend
RUN npm install

CMD npm start
EXPOSE 3000