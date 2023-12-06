// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCR7q2ZvQB0azvYyZaeT6d569OYgn0sXrA",
  authDomain: "netflix-gpt-9d417.firebaseapp.com",
  projectId: "netflix-gpt-9d417",
  storageBucket: "netflix-gpt-9d417.appspot.com",
  messagingSenderId: "1001923696114",
  appId: "1:1001923696114:web:007921704133b51cef476b",
  measurementId: "G-M82511XSF3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
