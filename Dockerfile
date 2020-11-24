from node:12-alpine

# Create app directory
WORKDIR /zeesolutions/src/app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

RUN npm run build

EXPOSE 1024

CMD [ "node", "dist/main" ]