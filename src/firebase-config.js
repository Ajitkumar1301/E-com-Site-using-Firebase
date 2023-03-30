// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCO9gChGS-vSY9HTpdebJZRRn6b5MMcvRA",
  authDomain: "employee-portal-1561a.firebaseapp.com",
  projectId: "employee-portal-1561a",
  storageBucket: "employee-portal-1561a.appspot.com",
  messagingSenderId: "327622274076",
  appId: "1:327622274076:web:0b62c19292635022d343d9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db= getFirestore(app)