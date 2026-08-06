FROM node:20-bullseye

RUN mkdir -p /app

WORKDIR /app

COPY . .

RUN npm install && npm audit && npm audit fix --force

CMD [ "npm", "start" ]