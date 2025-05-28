// Replace this config with your Firebase project config
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhAxQSoQCv9YSLBEH3arlbTpBIA2c_PGg",
  authDomain: "washabb-93af3.firebaseapp.com",
  projectId: "washabb-93af3",
  storageBucket: "washabb-93af3.firebasestorage.app",
  messagingSenderId: "271834057084",
  appId: "1:271834057084:web:80d33bf5cece6170d7bcf9",
  measurementId: "G-8547R85QEV"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
