// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwEF31FqzuXJsXO-X01--d3JYE9bXfvGU",
  authDomain: "btech-dashboard.firebaseapp.com",
  projectId: "btech-dashboard",
  storageBucket: "btech-dashboard.firebasestorage.app",
  messagingSenderId: "133611517752",
  appId: "1:133611517752:web:1551738b98f7471ff1f3cd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestoreDb = getFirestore(app);
export const provider = new GoogleAuthProvider();