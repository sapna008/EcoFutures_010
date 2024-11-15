// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase, set, get, ref } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxdyyL_TF-A_99KRxlDdRgzRc6_mkDL-0",
  authDomain: "casio-4ac93.firebaseapp.com",
  projectId: "casio-4ac93",
  storageBucket: "casio-4ac93.appspot.com",
  messagingSenderId: "115949092498",
  appId: "1:115949092498:web:d470d2d4a619c00f3eb04b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);  // Firebase Database reference
