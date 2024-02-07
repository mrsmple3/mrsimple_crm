import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAExGvquoAJ6O3X7T4XASYogBo0ESumAJk",
  authDomain: "my-crm-ab5af.firebaseapp.com",
  projectId: "my-crm-ab5af",
  storageBucket: "my-crm-ab5af.appspot.com",
  messagingSenderId: "709511792936",
  appId: "1:709511792936:web:4f75f4a78d60d37297a81d",
  measurementId: "G-LM93K2ZPRD",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database, app };
