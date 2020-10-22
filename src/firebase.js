import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAAFWEFhYA6Zmv5PvqNP03LUbLIlxnfqfk",
  authDomain: "chat-e35c5.firebaseapp.com",
  databaseURL: "https://chat-e35c5.firebaseio.com",
  projectId: "chat-e35c5",
  storageBucket: "chat-e35c5.appspot.com",
  messagingSenderId: "558166024841",
  appId: "1:558166024841:web:d2967077388d0cb9aadc58",
  measurementId: "G-YBYMHNT30F"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
console.log(firebaseApp)
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default db;