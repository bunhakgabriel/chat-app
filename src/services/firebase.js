import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCjjoQ7e21Z8__a9DoR4xmplqn9iX0B0vA",
    authDomain: "chat-app-aea6b.firebaseapp.com",
    projectId: "chat-app-aea6b",
    storageBucket: "chat-app-aea6b.firebasestorage.app",
    messagingSenderId: "111953763948",
    appId: "1:111953763948:web:7e1d18d6d96730d3154249"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider }