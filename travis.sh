#!/bin/sh
echo RUNNING TRAVIS.SH SCRIPT
mkdir pushmetoheroku
cd frontend/aikatauluttaja/
npm run build
cp -r build ../../backend/
cd ../../backend
cp -r . ../../pushmetoheroku/
cd ../../pushmetoheroku
echo Ollaan kansiossa:
pwd
npm install
npm start
echo TRAVIS.SH SCRIPT FINISHED!