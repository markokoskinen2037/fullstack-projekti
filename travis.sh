#!/bin/sh
echo RUNNING TRAVIS.SH SCRIPT

#Asennetaan frontin ja backin vaatimat setit...
cd frontend/aikatauluttaja/
#npm install
cd ../../backend
#npm install 
cd ..

#Käynnistetään frontend ja backend
cd backend/ && npm start &
cd frontend/aikatauluttaja/ && npm start &
cd frontend/aikatauluttaja/ && ./node_modules/.bin/cypress run &
#Ajetaan cypress testit


echo TRAVIS.SH SCRIPT FINISHED!