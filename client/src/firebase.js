// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-3289a.firebaseapp.com",
  projectId: "mern-blog-3289a",
  storageBucket: "mern-blog-3289a.appspot.com",
  messagingSenderId: "561371234969",
  appId: "1:561371234969:web:e8dd5ed1676586de0f2e08",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
