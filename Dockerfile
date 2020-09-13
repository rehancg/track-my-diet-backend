FROM node:10-alpine

RUN apk add --no-cache nodejs npm

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 1024

CMD ["npm", "run","start"]