import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Tu configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDQ3xcXzTuyjVk6cssb0itDRl9obMpcPag",
    authDomain: "gympro-219f1.firebaseapp.com",
    projectId: "gympro-219f1",
    storageBucket: "gympro-219f1.appspot.com",
    messagingSenderId: "686197252513",
    appId: "1:686197252513:web:7d9436114459330f9bebe0"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
const db = getFirestore(app);

export { db };
