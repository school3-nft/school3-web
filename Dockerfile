FROM node:18

WORKDIR /app

COPY ./src/package.json /app/package.json

RUN npm install

COPY ./src /app/

EXPOSE 3000

CMD ["npm", "run", "dev"]
