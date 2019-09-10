import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/auth';

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBJp1EyiQm3CM-IQfl85-v8CqiSY0soulk",
    authDomain: "car-rental-c13eb.firebaseapp.com",
    databaseURL: "https://car-rental-c13eb.firebaseio.com",
    projectId: "car-rental-c13eb",
    storageBucket: "car-rental-c13eb.appspot.com",
    messagingSenderId: "614749895913",
    appId: "1:614749895913:web:0f4ba1e90fea97f6"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  

  const storage = firebase.storage();

  export {
      storage, firebase as default
  }