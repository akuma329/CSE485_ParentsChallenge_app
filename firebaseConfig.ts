import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcyWEIRKl3fJKPyx-cJjcxe0akk2qQcFQ",
  authDomain: "parentschallenge-de874.firebaseapp.com",
  projectId: "parentschallenge-de874",
  storageBucket: "parentschallenge-de874.firebasestorage.app",
  messagingSenderId: "1022725510874",
  appId: "1:1022725510874:web:aa0b6cb51a6bf2f94a37e3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize authorization
const auth = getAuth(app);

// Initialize database
const db = getFirestore(app);

export { auth, db };
