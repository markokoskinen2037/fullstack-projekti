#!/bin/sh
echo RUNNING TRAVIS.SH SCRIPT
mkdir pushmetoheroku
cd frontend/aikatauluttaja/
npm run build
cp -r build ../../backend/
cd ../../backend
cp -r . ../../pushmetoheroku/
cd ../../pushmetoheroku
npm start & wait-on http://localhost:8080
cypress run
echo TRAVIS.SH SCRIPT FINISHED!