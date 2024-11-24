import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBSz1KJhu2r8eJKr73giLbaRKJ1loxQRfA",
  authDomain: "casino-game-cb808.firebaseapp.com",
  databaseURL: "https://casino-game-cb808-default-rtdb.firebaseio.com",
  projectId: "casino-game-cb808",
  storageBucket: "casino-game-cb808.firebasestorage.app",
  messagingSenderId: "900196404779",
  appId: "1:900196404779:web:1670f87045a720a6c7e46e"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);