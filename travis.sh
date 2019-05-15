#!/bin/sh
mkdir pushmetoheroku
cd frontend/aikatauluttaja/
npm run build
cp -r build ../../backend/
cd ../../backend
cp -r . ../../pushmetoheroku/
cd ../../pushmetoheroku
npm start & wait-on http://localhost:8080
cypress run