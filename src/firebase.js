import firebase from 'firebase'
let config = {
  apiKey: "AIzaSyD70AGTe1deQmmdQJcPQr0FZBW2Q5tDbtI",
  authDomain: "visitsongkhla.firebaseapp.com",
  databaseURL: "https://visitsongkhla.firebaseio.com",
  projectId: "visitsongkhla",
  storageBucket: "visitsongkhla.appspot.com",
  messagingSenderId: "654060098952"
  };
  //firebase.initializeApp(config);
  const firebaseapp=firebase.initializeApp(config);
  export const db = firebaseapp.database();