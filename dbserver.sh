#!/bin/bash

cd dbserver
npm i
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
npm run start

