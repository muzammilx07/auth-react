// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {GoogleAuthProvider} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKv0POqaVeEnBcgbCVcDq6wNW6Zvqns88",
  authDomain: "geekster-9bd90.firebaseapp.com",
  projectId: "geekster-9bd90",
  storageBucket: "geekster-9bd90.appspot.com",
  messagingSenderId: "701052530585",
  appId: "1:701052530585:web:0ab35ac237d8f8c752ad08",
  measurementId: "G-325GMER6VW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider(app);

export {app, provider};
