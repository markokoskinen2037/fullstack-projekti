#!/bin/sh
echo RUNNING TRAVIS.SH SCRIPT

#Asennetaan frontin ja backin vaatimat setit...
cd frontend/aikatauluttaja/
#npm install
cd ../../backend
#npm install 
cd ..

#Käynnistetään frontend ja backend ja ajetaan cypress testit
cd backend/ && npm install && npm start &
cd frontend/aikatauluttaja/ && npm install && npm start &
cd frontend/aikatauluttaja/ && pwd &&  ./node_modules/.bin/cypress run



pwd
echo TRAVIS.SH SCRIPT FINISHED!