import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
     apiKey: import.meta.env.VITE_API_KEY,
     authDomain: import.meta.env.VITE_AUTH_DOMAIN,
     projectId: import.meta.env.VITE_PROJECT_ID,
     storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
     messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
     appId: import.meta.env.VITE_API_ID,
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app);
export const Provider = new GoogleAuthProvider()
