FROM node:10.20.1-alpine

RUN mkdir /hospital_app

WORKDIR /hospital_app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000
