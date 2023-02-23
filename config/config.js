// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDaEuY6dkK6Uu_aL1YJkff6wlEXlG2kNxs",
  authDomain: "e-therapy-b812c.firebaseapp.com",
  projectId: "e-therapy-b812c",
  storageBucket: "e-therapy-b812c.appspot.com",
  messagingSenderId: "515119764541",
  appId: "1:515119764541:web:bd7978e1c5a4218dd68654",
  measurementId: "G-QJSDY29PVP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app) 

export { db};
