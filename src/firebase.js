// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdEWXkzbxepTfYTLojRZloa4D1ComSsNM",
  authDomain: "podcast-app-ae32a.firebaseapp.com",
  projectId: "podcast-app-ae32a",
  storageBucket: "podcast-app-ae32a.appspot.com",
  messagingSenderId: "560888783832",
  appId: "1:560888783832:web:b5a9e33778b7f8c43788ad",
  measurementId: "G-8Y75JN5ST4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, storage, auth, provider };
