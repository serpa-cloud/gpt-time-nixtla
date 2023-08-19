FROM node:lts

WORKDIR /app

COPY package*.json ./

ENV PORT=80

RUN yarn

COPY . .

RUN yarn build

EXPOSE 80

CMD [ "yarn", "serve" ]
