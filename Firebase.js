// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { API_KEY, APP_ID, AUTH_DOMAIN, MESSAGING_SENDER_ID, PROJECT_ID, STORAGE_BUCKET } from "./CREDENCIALES";
// TODO: Add SDKs for Firebase products that you want to use
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
};

// Inicializar Firebase
const appFirebase = initializeApp(firebaseConfig); // Inicializa Firebase
const auth = initializeAuth(appFirebase, {
  persistence: getReactNativePersistence(AsyncStorage)
});
const db = getFirestore(appFirebase);

// Exportar la autenticación y el firestore
export { auth, db };