FROM node:alpine

ENV NODE_ENV=development

RUN npm install -g nodemon cross-env

WORKDIR /app

ADD package.json package-lock.json ./

RUN npm install

ADD src ./src

CMD ["npm", "run", "dev"]