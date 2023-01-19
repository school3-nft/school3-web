FROM node:18

WORKDIR /app

COPY ./src/package.json /app/package.json

RUN npm install

ENV FIREBASE_API_KEY ""
ENV FIREBASE_AUTH_DOMAIN ""
ENV FIREBASE_PROJECT_ID ""
ENV FIREBASE_STORAGE_BUCKET ""
ENV FIREBASE_MESSAGING_SENDER_ID ""
ENV FIREBASE_APP_ID ""
ENV FIREBASE_MEASURMENT_ID ""
ENV API_URL ""

COPY ./src /app/

COPY ./create_env.sh /app/create_env.sh

EXPOSE 3000

CMD ["bash", "-c", "./create_env.sh && npm run dev"]
