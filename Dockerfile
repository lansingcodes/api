FROM  node:8.12.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

ARG NODE_ENV=production
ENV NODE_ENV ${NODE_ENV}

EXPOSE 9292

CMD [ "npm", "start" ]
