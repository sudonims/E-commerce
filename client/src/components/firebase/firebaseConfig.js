import firebase from "firebase";
import "firebase/firestore";

export const APP = firebase.initializeApp({
  apiKey: "AIzaSyAEuKv8yuKhq2JaxHEYoS-_ZiJNkXXRvJs",
  authDomain: "cloth-match-792e6.firebaseapp.com",
  projectId: "cloth-match-792e6",
  storageBucket: "cloth-match-792e6.appspot.com",
  messagingSenderId: "326192394631",
  appId: "1:326192394631:web:b2a60e86c4517fdcebe322",
  measurementId: "G-TTB2D25BDT",
});

export const db = firebase.firestore();
