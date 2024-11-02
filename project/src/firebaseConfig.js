import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: ".firebasestorage.app",
  messagingSenderId: "",
  appId: "1::web:7a7acf920c5008f28ae155",
  measurementId: ""
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
