import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCYpLlEAvkowpLJ3QpEYUAVxLfHeIYFgcs",
  authDomain: "irisamdocs.firebaseapp.com",
  databaseURL: "https://irisamdocs-default-rtdb.firebaseio.com",
  projectId: "irisamdocs",
  storageBucket: "irisamdocs.firebasestorage.app",
  messagingSenderId: "885386472072",
  appId: "1:885386472072:web:42e1889660537a52f44d3d",
  measurementId: "G-YH4T815EPH",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);

export { auth, database, firebaseApp };
