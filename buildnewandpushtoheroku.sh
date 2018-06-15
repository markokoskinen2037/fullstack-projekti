#!/bin/sh
cd frontend/aikatauluttaja/
npm run build
cp -r build ../../backend/
cd ../../backend
cp -r . ../../pushmetoheroku/
cd ../../pushmetoheroku
git add .
git commit -m "new automatic commit"
git push heroku master