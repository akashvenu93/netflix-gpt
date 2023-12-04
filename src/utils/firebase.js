// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjP1Vukb20QSZe68Cnfb21xb8QiBOLVF4",
  authDomain: "netflixgpt-2d1bd.firebaseapp.com",
  projectId: "netflixgpt-2d1bd",
  storageBucket: "netflixgpt-2d1bd.appspot.com",
  messagingSenderId: "790343039698",
  appId: "1:790343039698:web:829d9f236431e39e1d0b0b",
  measurementId: "G-S67PWE37CQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
