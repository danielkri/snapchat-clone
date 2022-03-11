import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyC-ygHVFzNkyNRMqprwZyBJgXMFO1fT1BY",
  authDomain: "snapchat-clone-dk.firebaseapp.com",
  projectId: "snapchat-clone-dk",
  storageBucket: "snapchat-clone-dk.appspot.com",
  messagingSenderId: "282942934254",
  appId: "1:282942934254:web:a48658c8063219b4db77ff",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.fireStore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, storage, provider };
