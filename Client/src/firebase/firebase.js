// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_URL,
  authDomain: "sufayn-estate.firebaseapp.com",
  projectId: "sufayn-estate",
  storageBucket: "sufayn-estate.firebasestorage.app",
  messagingSenderId: "368736239441",
  appId: "1:368736239441:web:620815c99466ba14669d70"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);