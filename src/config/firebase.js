import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAFZho0j1UVH8YeWPKN84HQ0hDlS9NNS4s',
  authDomain: 'helpus-api.firebaseapp.com',
  projectId: 'helpus-api',
  storageBucket: 'helpus-api.appspot.com',
  messagingSenderId: '803741636136',
  appId: '1:803741636136:web:4a245310d1e5fcd4cdc71d',
  measurementId: 'G-MQM6CQP3ZQ',
}

let app

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app()
}

const db = app.firestore()
const auth = firebase.auth()

export { db, auth }
