import { initializeApp } from "firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { GoogleSignin } from '@react-native-google-signin/google-signin';  // Importar GoogleSignin
//import { API_KEY, APP_ID, AUTH_DOMAIN, MESSAGING_SENDER_ID, PROJECT_ID, STORAGE_BUCKET, WEB_CLIENT_ID } from "../CREDENCIALES";
import { API_KEY, APP_ID, AUTH_DOMAIN, MESSAGING_SENDER_ID, PROJECT_ID, STORAGE_BUCKET, WEB_CLIENT_ID } from "C:/Users/danie/Documents/Modular/GymProGit/GymProGit/GymPro/CREDENCIALES";


const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
};

const appFirebase = initializeApp(firebaseConfig); // Inicializa Firebase
const auth = initializeAuth(appFirebase, {
  persistence: getReactNativePersistence(AsyncStorage)
});
const db = getFirestore(appFirebase);

// Configurar Google Sign-In
GoogleSignin.configure({
  webClientId: WEB_CLIENT_ID,
});

export { auth, db, GoogleSignin };  // Asegúrate de exportar GoogleSignin si lo necesitas en otros archivos
