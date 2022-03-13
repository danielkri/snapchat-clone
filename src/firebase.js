import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { getPerformance } from "firebase/performance";

const firebaseConfig = {
  apiKey: "AIzaSyC-ygHVFzNkyNRMqprwZyBJgXMFO1fT1BY",
  authDomain: "snapchat-clone-dk.firebaseapp.com",
  projectId: "snapchat-clone-dk",
  storageBucket: "snapchat-clone-dk.appspot.com",
  messagingSenderId: "282942934254",
  appId: "1:282942934254:web:a48658c8063219b4db77ff",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();

// const firebaseApp = firebase.initializeApp(firebaseConfig);
// const db = firebaseApp.fireStore();
// const auth = firebase.auth();
// const storage = firebase.storage();
// const provider = new firebase.auth.GoogleAuthProvider();

export {
  db,
  auth,
  storage,
  provider,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  collection,
};
