// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
<<<<<<< HEAD
  apiKey: import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY,
=======
  apiKey: import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY,,
>>>>>>> bcf35c90e7fb78e8c54fcd78c83879dbee2d5a0a
  authDomain: "planoramaai.firebaseapp.com",
  projectId: "planoramaai",
  storageBucket: "planoramaai.firebasestorage.app",
  messagingSenderId: "688411206177",
  appId: "1:688411206177:web:852fffde521547e2a83960",
  measurementId: "G-KMEQ52ZQLX"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);
