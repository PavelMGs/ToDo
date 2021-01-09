import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCt2p3XFiHRODV2DCyCNaK0g6iB4rrK9-w",
    authDomain: "todo-2e315.firebaseapp.com",
    databaseURL: "https://todo-2e315-default-rtdb.firebaseio.com",
    projectId: "todo-2e315",
    storageBucket: "todo-2e315.appspot.com",
    messagingSenderId: "524949307841",
    appId: "1:524949307841:web:5ccba603b33c2d28a6af40",
    measurementId: "G-WYCD0PMSBH"
  };

firebase.initializeApp(firebaseConfig);

export const database = firebase.database();
export const auth = firebase.auth();
export const signWithEmail = (email: string, password: string) => auth.signInWithEmailAndPassword(email, password);
export const createUser = (email: string, password: string) => auth.createUserWithEmailAndPassword(email, password);