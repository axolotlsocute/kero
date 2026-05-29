import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCqMvG9VLy-ze07cekhX7IDE1_2GRw0XGk",
  authDomain: "kero-a0433.firebaseapp.com",
  projectId: "kero-a0433",
  storageBucket: "kero-a0433.firebasestorage.app",
  messagingSenderId: "824980207836",
  appId: "1:824980207836:web:b7185ddace360309271c19"
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});