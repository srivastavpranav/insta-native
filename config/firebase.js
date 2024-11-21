import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAAF-RGHHlUcmoq8zk01aLnzj025VfLO-Q",
  authDomain: "insta-native-6d350.firebaseapp.com",
  projectId: "insta-native-6d350",
  storageBucket: "insta-native-6d350.firebasestorage.app",
  messagingSenderId: "144376301548",
  appId: "1:144376301548:web:16748ead1e329b4f91a2c9",
  measurementId: "G-0KBRC4C39C",
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
