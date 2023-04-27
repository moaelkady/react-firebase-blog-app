import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDTvntQeMLBr2b8oIsLFBDZPnlDqmDuqbc",
  authDomain: "moqadi-blogs.firebaseapp.com",
  projectId: "moqadi-blogs",
  storageBucket: "moqadi-blogs.appspot.com",
  messagingSenderId: "155898058368",
  appId: "1:155898058368:web:01c3d267c4c0eaec85b865",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };