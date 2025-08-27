import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAG00WE1_4m-LlQcI_czXkcOdB7UT6jSk8",
  authDomain: "react-classmate.firebaseapp.com",
  projectId: "react-classmate",
  storageBucket: "react-classmate.firebasestorage.app",
  messagingSenderId: "84963427508",
  appId: "1:84963427508:web:71a55b7d2dd18bb23243e1",
  measurementId: "G-2RYQ2689ZX",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
