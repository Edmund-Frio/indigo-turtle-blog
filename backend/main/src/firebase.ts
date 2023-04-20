import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDY1Pbm1UNL7KYXdfQZi80KEsAQ0dV8sfk",
    authDomain: "indigo-turtle-blog.firebaseapp.com",
    projectId: "indigo-turtle-blog",
    storageBucket: "indigo-turtle-blog.appspot.com",
    messagingSenderId: "264022206754",
    appId: "1:264022206754:web:d0d4a61b299c7025d5dd7b",
    measurementId: "G-75JTVYVM4Q",
    databaseURL: "https://indigo-turtle-blog-default-rtdb.firebaseio.com"
  };

  export const dbapp = initializeApp(firebaseConfig);
  //export const analytics = getAnalytics(dbapp);
  export const auth = getAuth(dbapp);
  export const db = getDatabase(dbapp);
  // Initialize Realtime Database and get a reference to the service
  //const database = getDatabase(dbapp);

