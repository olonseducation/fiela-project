// Mengimpor mesin inti Firebase
import { initializeApp } from 'firebase/app';
// Mengimpor mesin Database Firestore
import { getFirestore } from 'firebase/firestore';

// ⚠️ GANTI BAGIAN INI DENGAN KODE DARI FIREBASE CONSOLE MILIKMU ⚠️
const firebaseConfig = {
  apiKey: "AIzaSyAPhiBykPMlIwGIE3Nc2c9e-FAniGKIJ-8",
  authDomain: "fiela-database.firebaseapp.com",
  projectId: "fiela-database",
  storageBucket: "fiela-database.firebasestorage.app",
  messagingSenderId: "60789783689",
  appId: "1:60789783689:web:09bdeeed933f9e7aa7da58"
};

// Menyalakan mesin Firebase di kapal FIELA
const app = initializeApp(firebaseConfig);

// Membuka brankas Firestore dan mengekspornya agar bisa dipakai oleh file lain (seperti App.tsx)
export const db = getFirestore(app);