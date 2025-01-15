FROM node

WORKDIR /usr/app

COPY package.json ./

RUN yarn

COPY . .

EXPOSE 9000
EXPOSE 5432

CMD ["npm", "run", "dev"]