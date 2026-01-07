import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDArzUD2z9qSf9ZTIISovlsuvBYtHzp6ng",
  authDomain: "bc-crypto-lab.firebaseapp.com",
  projectId: "bc-crypto-lab",
  storageBucket: "bc-crypto-lab.firebasestorage.app",
  messagingSenderId: "621543566988",
  appId: "1:621543566988:web:7f3882b49a0c891dab95a9",
  measurementId: "G-NZX1LP9MJX"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export { app, analytics, storage };