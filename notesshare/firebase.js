import { initializeApp } from "https://www.gstatic.com/firebasejs/13.3.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/13.3.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/13.3.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/13.3.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyBm_1-hlu9jgm8haUumjtuEIROWv6HWZog",
  authDomain: "logun-7ae48.firebaseapp.com",
  projectId: "logun-7ae48",
  storageBucket: "logun-7ae48.firebasestorage.app",
  messagingSenderId: "6033039970",
  appId: "1:6033039970:web:e4dbb093d1b29cb129273b",
  measurementId: "G-BRZC7644NC"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

const firebaseErrors = {
  "auth/email-already-in-use": "That email already has an account. Try logging in.",
  "auth/invalid-credential": "The email or password is incorrect.",
  "auth/invalid-email": "Enter a valid email address.",
  "auth/popup-closed-by-user": "The Google sign-in window was closed before finishing.",
  "auth/weak-password": "Choose a stronger password with at least 8 characters.",
  "auth/too-many-requests": "Too many attempts. Wait a little and try again.",
  "permission-denied": "Firebase denied this request. Check that the security rules are deployed and that you are signed in.",
  "storage/unauthorized": "Firebase denied access to this file. Check the Storage rules and your sign-in status."
};

export function firebaseErrorMessage(error) {
  if (error && error.code && firebaseErrors[error.code]) {
    return firebaseErrors[error.code];
  }
  return "Could not connect to Firebase. Check your internet connection and Firebase setup, then try again.";
}
