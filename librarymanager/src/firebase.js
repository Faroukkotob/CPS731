// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAI_3Zod_qoucYDvRShUGDPHYeVNXby-5s",
  authDomain: "online-library-system-8fe64.firebaseapp.com",
  projectId: "online-library-system-8fe64",
  storageBucket: "online-library-system-8fe64.appspot.com",
  messagingSenderId: "147313535959",
  appId: "1:147313535959:web:77c19aa19f16dc756b3992",
  measurementId: "G-CW81HP92SX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { app, auth, firestore}
