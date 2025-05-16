// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAWxwabltBbOPOONO8BvH6jvoekAmvsFyM",
  authDomain: "triunfo-7d880.firebaseapp.com",
  projectId: "triunfo-7d880",
  storageBucket: "triunfo-7d880.firebasestorage.app",
  messagingSenderId: "463014441605",
  appId: "1:463014441605:web:9b6a67b7b993850a4befec",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
export default app;
