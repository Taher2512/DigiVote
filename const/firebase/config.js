
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyA-4cDTOjWrMxItNHftnVYKvvJ53rREdrA",
    authDomain: "aminnovate-ef7fb.firebaseapp.com",
    projectId: "aminnovate-ef7fb",
    storageBucket: "aminnovate-ef7fb.appspot.com",
    messagingSenderId: "297782612928",
    appId: "1:297782612928:web:086ebfc3c684ff7ea5ae25",
    measurementId: "G-HEYTH8KLPE"
  };
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
