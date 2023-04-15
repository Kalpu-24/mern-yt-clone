// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjA6liFa4uw06SeGIN1EMKkCaCAGUDguw",
  authDomain: "yt-clone-2b747.firebaseapp.com",
  projectId: "yt-clone-2b747",
  storageBucket: "yt-clone-2b747.appspot.com",
  messagingSenderId: "846552545942",
  appId: "1:846552545942:web:c53d4b3d8a971b42c8e0b7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export default app;