import firebase from   'firebase/app';

import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyCDUImEbz-tJ9Y1v6Sd49S27hyXLHzc8uY",
    authDomain: "wordtyper-4272f.firebaseapp.com",
    projectId: "wordtyper-4272f",
    storageBucket: "wordtyper-4272f.appspot.com",
    messagingSenderId: "254259945650",
    appId: "1:254259945650:web:09fb59dcccffb8672d29ab"
  };

  // Initialize Firebase

  if(firebase.app.lenght ===0){
  Firebase = firebase.initializeApp(firebaseConfig);
  }

  export default Firebase;
