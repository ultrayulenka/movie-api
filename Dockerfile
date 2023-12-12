FROM node:14.17-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY .production.env .production.env
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build 

EXPOSE 5000

CMD ["node", "dist/main.js"]