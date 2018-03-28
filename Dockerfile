FROM node:carbon

RUN mkdir /app

WORKDIR /app

ADD package.json ./

RUN npm install

COPY . .

EXPOSE 3005

RUN npm run bundle

CMD ["npm", "start"]