#!/bin/sh
mkdir opintojenaikatauluttaja
cd opintojenaikatauluttaja
git init
heroku git:remote -a opintojenaikatauluttaja
cd ..
cd frontend/aikatauluttaja/
npm run build
cp -r build ../../backend/
cd ../../backend
cp -r . ../opintojenaikatauluttaja/
cd ../opintojenaikatauluttaja