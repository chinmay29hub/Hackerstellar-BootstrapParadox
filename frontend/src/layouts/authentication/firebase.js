// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { Database, getDatabase } from "firebase/database";
import "firebase/database";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyBFVUFb4OxHB5xqgs_Gj9Bks45UN_kkt1s",
    authDomain: "terra-finance-8927d.firebaseapp.com",
    databaseURL: "https://terra-finance-8927d-default-rtdb.firebaseio.com",
    projectId: "terra-finance-8927d",
    storageBucket: "terra-finance-8927d.appspot.com",
    messagingSenderId: "999929828829",
    appId: "1:999929828829:web:3c2dcbb15574ab908d9234",
    measurementId: "G-GSS4D7EXHF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getDatabase(app)
export {app};
export const fs = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
// export const auth = getAuth(app);

export default app;
