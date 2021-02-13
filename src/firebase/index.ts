import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import { firebaseConfig } from '../../private';



firebase.initializeApp(firebaseConfig);

export const database = firebase.database();
export const auth = firebase.auth()
export const signWithEmail = (email: string, password: string) => auth.signInWithEmailAndPassword(email, password);
export const createUser = (email: string, password: string) => auth.createUserWithEmailAndPassword(email, password);