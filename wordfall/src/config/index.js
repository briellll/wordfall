// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDUImEbz-tJ9Y1v6Sd49S27hyXLHzc8uY",
  authDomain: "wordtyper-4272f.firebaseapp.com",
  projectId: "wordtyper-4272f",
  storageBucket: "wordtyper-4272f.appspot.com",
  messagingSenderId: "254259945650",
  appId: "1:254259945650:web:09fb59dcccffb8672d29ab"
};

// Initialize Firebase
const Firebase = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(Firebase);
