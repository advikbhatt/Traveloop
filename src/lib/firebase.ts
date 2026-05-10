import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBnQB0HY6gx8juU5FMKUwvrHUlTREoIAiA",
  authDomain: "traveloop-9b25c.firebaseapp.com",
  projectId: "traveloop-9b25c",
  storageBucket: "traveloop-9b25c.firebasestorage.app",
  messagingSenderId: "271362606387",
  appId: "1:271362606387:web:cfcc449651275676586a46",
  measurementId: "G-B7SQ1GW70X"
};

import { getFirestore } from "firebase/firestore";

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

// Analytics can only be initialized on the client side
let analytics;
if (typeof window !== "undefined") {
  isSupported().then((yes: boolean) => yes && (analytics = getAnalytics(app)));
}

export { app, auth, analytics, googleProvider, db };
