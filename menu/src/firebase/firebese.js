// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCQgkQwc17ETzK5ToY8WfTDpGO3VVpfjiY",
  authDomain: "teslacoffee-04.firebaseapp.com",
  projectId: "teslacoffee-04",
  storageBucket: "teslacoffee-04.firebasestorage.app",
  messagingSenderId: "805172099232",
  appId: "1:805172099232:web:bb84b3422c2241777eb1c5",
  measurementId: "G-R5XJ945MRY"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const data = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
