// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAqtZD7j9uAyVEUre7KiZ2-9A84VrTfTo",
  authDomain: "prodavalko.firebaseapp.com",
  projectId: "prodavalko",
  storageBucket: "prodavalko.appspot.com",
  messagingSenderId: "756694678689",
  appId: "1:756694678689:web:7ffacc4841b3c9124584e0",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);

export const db = getFirestore(firebaseApp);

export const storage = getStorage(firebaseApp);
