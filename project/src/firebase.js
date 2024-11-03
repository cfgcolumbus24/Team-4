// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "",
  authDomain: "cfgproject-d0746.firebaseapp.com",
  projectId: "cfgproject-d0746",
  storageBucket: "cfgproject-d0746.firebasestorage.app",
  messagingSenderId: "540394057808",
  appId: "1:540394057808:web:7a7acf920c5008f28ae155",
  measurementId: "G-G5C1X27H1L"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);