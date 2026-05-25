// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "vingo-delivery-e1ccd.firebaseapp.com",
  projectId: "vingo-delivery-e1ccd",
  storageBucket: "vingo-delivery-e1ccd.firebasestorage.app",
  messagingSenderId: "861839782375",
  appId: "1:861839782375:web:779a0c6099977eba1e0d42",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
