import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDHidzDVDjDapBDIS-tRNjIlg4_A-8sylI",
  authDomain: "memestore-eabaa.firebaseapp.com",
  projectId: "memestore-eabaa",
  storageBucket: "memestore-eabaa.appspot.com",
  messagingSenderId: "471092181828",
  appId: "1:471092181828:web:219c1d53553a5c505af511",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

