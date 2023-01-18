#!/bin/sh 

tee ./.env << END
NEXT_PUBLIC_FIREBASE_CONFIG="{"apiKey": "${FIREBASE_API_KEY}","authDomain": "${FIREBASE_AUTH_DOMAIN}","projectId": "${FIREBASE_PROJECT_ID}","storageBucket": "${FIREBASE_STORAGE_BUCKET}","messagingSenderId": "${FIREBASE_MESSAGING_SENDER_ID}","appId": "${FIREBASE_APP_ID}","measurementId": "${FIREBASE_MEASURMENT_ID}"}"
API_URL=${API_URL}
END