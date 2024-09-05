// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

// // TODO: Replace the following with your app's Firebase project configuration
// // See: https://firebase.google.com/docs/web/learn-more#config-object
// const firebaseConfig = {
//   // ...
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);


// // Initialize Firebase Authentication and get a reference to the service
// const auth = getAuth(app);

// export default auth


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkL5l_rhLPfrvT2nwuO19zfmya4hpIjTY",
  authDomain: "js-tech-ind-ltd.firebaseapp.com",
  projectId: "js-tech-ind-ltd",
  storageBucket: "js-tech-ind-ltd.appspot.com",
  messagingSenderId: "1082589093603",
  appId: "1:1082589093603:web:841fb14cad458912002fd6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;