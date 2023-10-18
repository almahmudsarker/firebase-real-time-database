import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDfWSPQdhrsV3OJY2xzBIRDqVYBtZ7sJOY",
  authDomain: "react-contact-289b1.firebaseapp.com",
  projectId: "react-contact-289b1",
  storageBucket: "react-contact-289b1.appspot.com",
  messagingSenderId: "741223723965",
  appId: "1:741223723965:web:e94932de5116135c3bd8d4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const databaseRef = ref(database, "contacts");

export default database;
