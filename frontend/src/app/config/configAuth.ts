// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

console.log(process.env.TEST_ENV); // This should print "Hello World!" to the console

const FIREBASE_KEY = process.env.NEXT_PUBLIC_API_KEY;
const AUTH_DOMAIN = process.env.NEXT_PUBLIC_AUTH_DOMAIN;
const PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID;
const STORAGE_BUCKET = process.env.NEXT_PUBLIC_STORAGE_BUCKET;
const MESSAGING_ID = process.env.NEXT_PUBLIC_MESSAGING_ID;
const APP_ID = process.env.NEXT_PUBLIC_APP_ID;
const MEASUREMENT_ID = process.env.NEXT_PUBLIC_MEASUREMENT_ID;

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

// This is the auth that we will export (Singleton instance)
export { app };