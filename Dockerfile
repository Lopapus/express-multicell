FROM node:17-alpine3.14

WORKDIR /app
COPY . .
RUN npm i --save

CMD ["node","/app/index.js"]