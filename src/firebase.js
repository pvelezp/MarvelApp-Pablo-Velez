import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyC-o4vL6c5YMRtcPkHzDn2qJqCGCqcZCuc",
    authDomain: "velez-marvel-app.firebaseapp.com",
    databaseURL: "https://velez-marvel-app.firebaseio.com",
    projectId: "velez-marvel-app",
    storageBucket: "velez-marvel-app.appspot.com",
    messagingSenderId: "972126422198",
    appId: "1:972126422198:web:e469df83ac427646de9217",
    measurementId: "G-RRP50G44EZ"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)
  const db  = firebaseApp.firestore()
  const auth = firebase.auth()
  const storage = firebase.storage()
  const provider = new firebase.auth.GoogleAuthProvider()

  export { auth, provider, storage}
  export default db