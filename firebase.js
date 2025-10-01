// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: 'AIzaSyDuZM_nQ28D1Xsh6rEgwXJZwhTabIB8bz0',
  authDomain: 'todo-app-7177e.firebaseapp.com',
  projectId: 'todo-app-7177e',
  storageBucket: 'todo-app-7177e.firebasestorage.app',
  messagingSenderId: '711255103403',
  appId: '1:711255103403:web:2f696ebf2eee3c45f0e4ee',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
