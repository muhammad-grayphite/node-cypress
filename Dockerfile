# syntax=docker/dockerfile:1
FROM cypress/base:18.14.1 as base

WORKDIR /code

COPY package.json package.json
COPY package-lock.json package-lock.json

EXPOSE 8000

RUN npm install
COPY . .

RUN npm ci
COPY . .
# RUN npx browserstack-cypress run
CMD [ "node", "index.js"]