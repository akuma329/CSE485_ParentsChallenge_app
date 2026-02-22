import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

//configuration from firebase
const firebaseConfig = {
  apiKey: "AIzaSyCl7iYEsTIh2cPmImHAavro4rhfed90Th4",
  authDomain: "parentschallenge-abf45.firebaseapp.com",
  projectId: "parentschallenge-abf45",
  storageBucket: "parentschallenge-abf45.firebasestorage.app",
  messagingSenderId: "268594493628",
  appId: "1:268594493628:web:253cb4daeef22bbba778b9"
};

//start connection
const app = initializeApp(firebaseConfig);

//create authentication service
export const auth = getAuth(app);

//create database
export const db = getFirestore(app);