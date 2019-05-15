#!/bin/sh
mkdir pushmetoheroku
cd pushmetoheroku
git init
heroku git:remote -a opintojenaikatauluttaja
cd ..
cd frontend/aikatauluttaja/
npm run build
cp -r build ../../backend/
cd ../../backend
cp -r . ../pushmetoheroku/
cd ../pushmetoheroku