import firebase from 'firebase'
let config = {
    apiKey: "AIzaSyCPOSwMdKirDt3Dw0prP4tv7S5vk12xpRg",
    authDomain: "projectfi-635a2.firebaseapp.com",
    databaseURL: "https://projectfi-635a2.firebaseio.com",
    projectId: "projectfi-635a2",
    storageBucket: "projectfi-635a2.appspot.com",
    messagingSenderId: "913713500929"
  };
  //firebase.initializeApp(config);
  const firebaseapp=firebase.initializeApp(config);
  export const db = firebaseapp.database();