import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import 'firebase/compat/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyBp4_XSYFBGgbvCYLYflacTdYhociTBt6c',
  authDomain: 'helpus-app.firebaseapp.com',
  projectId: 'helpus-app',
  storageBucket: 'helpus-app.appspot.com',
  messagingSenderId: '389464724983',
  appId: '1:389464724983:web:d691c3854c06a150b5caf2',
  measurementId: 'G-F7D7S8J3PL',
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}
export { firebase }
