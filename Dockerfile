# syntax=docker/dockerfile:1
FROM cypress/browsers:node14.16.0-chrome90-ff88 as base

WORKDIR /code

COPY package.json package.json
COPY package-lock.json package-lock.json

EXPOSE 8000

RUN npm install
COPY . .

RUN npm ci
COPY . .
CMD [ "node", "index.js"]