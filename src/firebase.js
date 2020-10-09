// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyDvDQ20dPRaL7OxjfKunSqVNWBFlvGI3Es",
    authDomain: "whatsapp-clone-12064.firebaseapp.com",
    databaseURL: "https://whatsapp-clone-12064.firebaseio.com",
    projectId: "whatsapp-clone-12064",
    storageBucket: "whatsapp-clone-12064.appspot.com",
    messagingSenderId: "409916801902",
    appId: "1:409916801902:web:6f6afdee61d720976e777f",
    measurementId: "G-LLS74NRY5K"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;