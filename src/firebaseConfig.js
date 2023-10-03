// Initialize Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: "typing-speed-test-web.firebaseapp.com",
  projectId: "typing-speed-test-web",
  storageBucket: "typing-speed-test-web.appspot.com",
  messagingSenderId: "992555676918",
  appId: "1:992555676918:web:ac21f5c138c51b9ba9e8d7",
  measurementId: "G-KX6Y20M1KZ",
};

// updated way to connect firebase to your app

const app = initializeApp(firebaseConfig);
console.log("Connected Firebase");
const auth = getAuth(app);
const database = getFirestore(app);
export { auth, database };

// --------------------------------------Old version code of firebase
// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";
// import "firebase/compat/firestore";

// one way to connect firebase to your app
// const firebaseApp = firebase.initializeApp(firebaseConfig);

// const auth = firebase.auth();
// const database = firebaseApp.firestore();

// console.log(auth);
