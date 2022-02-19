// Import the functions you need from the SDKs you need
import * as firebase from "firebase/firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import 'firebase/database'
import 'firebase/auth'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmpIu8ynSBxjG3lNmJ5fw-7dw8IrfauLo",
  authDomain: "pmp-progress-managment-portal.firebaseapp.com",
  databaseURL: "https://pmp-progress-managment-portal-default-rtdb.firebaseio.com",
  projectId: "pmp-progress-managment-portal",
  storageBucket: "pmp-progress-managment-portal.appspot.com",
  messagingSenderId: "70835243137",
  appId: "1:70835243137:web:e1ab2906994f6769806580"
};

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);