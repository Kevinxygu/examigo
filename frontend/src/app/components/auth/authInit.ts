// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const FIREBASE_KEY = process.env.VITE_FIREBASE_KEY;
const AUTH_DOMAIN = process.env.VITE_AUTH_DOMAIN;
const PROJECT_ID = process.env.VITE_PROJECT_ID;
const STORAGE_BUCKET = process.env.VITE_STORAGE_BUCKET;
const MESSAGING_ID = process.env.VITE_MESSAGING_ID;
const APP_ID = process.env.VITE_APP_ID;
const MEASUREMENT_ID = process.env.VITE_MEASUREMENT_ID;

const firebaseConfig = {
  apiKey: FIREBASE_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

console.log(process.env.TEST_ENV); // This should print out 'Hello World!' in the console

export { app };