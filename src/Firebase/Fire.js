
import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyCDK587PNQiVLFm-CO86NCTG2uUdwad7Cs",
    authDomain: "social-media-app-2021.firebaseapp.com",
    projectId: "social-media-app-2021",
    storageBucket: "social-media-app-2021.appspot.com",
    messagingSenderId: "389728704698",
    appId: "1:389728704698:web:4aa7600d16ecd2306b4a83"
  };


const fireDb = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export default fireDb