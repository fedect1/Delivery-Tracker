FROM node:alpine

WORKDIR /app

ADD package.json /package-lock.json ./

RUN npm install

ADD .eslintrc.cjs /app/.eslintrc.cjs
ADD index.html /app/index.html
ADD vite.config.js /app/vite.config.js
ADD src /app/src
ADD public /app/public

CMD ["npm", "run", "dev"]
