
import firebase from "firebase/compat/app"
import "firebase/compat/firestore";
import { Timestamp, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCpqNNibkLTsBCXiKjXZfZlXytzA6pvg0E",
    authDomain: "react-firebase-1-5f720.firebaseapp.com",
    projectId: "react-firebase-1-5f720",
    storageBucket: "react-firebase-1-5f720.appspot.com",
    messagingSenderId: "71576122989",
    appId: "1:71576122989:web:51706b6f1436dd8ad67164",
    measurementId: "G-FPEKYKZCNB"
};

const app = initializeApp(firebaseConfig)
export const db = getFirestore();
export const auth = getAuth(app);
