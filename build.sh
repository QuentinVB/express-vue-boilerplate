#!/bin/bash

git clone

cd server/
yarn
cd ..

cd app/
yarn
yarn build
cd ..

cp -r server/ ~/server
cp -r dist/ ~/dist