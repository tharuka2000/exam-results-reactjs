// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, doc, getDoc, getDocs, getFirestore, onSnapshot, setDoc, writeBatch } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXkgmT9YUQGdGDu2pepISz6gfM69kDNDg",
  authDomain: "exam-results-2022.firebaseapp.com",
  projectId: "exam-results-2022",
  storageBucket: "exam-results-2022.appspot.com",
  messagingSenderId: "29544111168",
  appId: "1:29544111168:web:4665c57a7360f0f067d3a5",
  measurementId: "G-D4K8Y79LTS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const firestore = getFirestore();
const studentsRef =collection(firestore,'students');
const marksRef =collection(firestore,'marks');


export  {firestore, studentsRef,marksRef};

