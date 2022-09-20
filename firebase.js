import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAiyufszihjEAMX1IDuqtJK4tV-tsmxkQ4",
  authDomain: "devlist-62e12.firebaseapp.com",
  projectId: "devlist-62e12",
  storageBucket: "devlist-62e12.appspot.com",
  messagingSenderId: "683653394353",
  appId: "1:683653394353:web:c6114ee19c65b724e31790"
};

// Initialize Firebase

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();


export default app;
export { db, storage };