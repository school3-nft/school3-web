FROM node:18

ENV ENV_FILE=./.env

WORKDIR /app

COPY ./src/package.json /app/package.json

RUN npm install

COPY ./src /app/

COPY ${ENV_FILE} /app/

EXPOSE 3000

CMD ["npm", "run", "dev"]
