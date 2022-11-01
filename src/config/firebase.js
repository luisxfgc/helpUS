import firebase from 'firebase/compat/app'
import 'firebase/firestore'
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

let app

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app()
}

export const db = firebase.firestore()
export const auth = firebase.auth()

export const createUserDocument = async (user, additionalData) => {
  if (!user) return

  const userRef = db.doc('users/${user.uid}')
  const snapshot = await userRef.get()

  if (!snapshot.exists) {
    const { email } = user
    const { phone, name, adress } = additionalData

    try {
      userRef.set({ name, email, phone, adress, createdAt: new Date() })
      console.log(userRef)
    } catch (error) {
      console.error('error', error.message)
    }
  }
}

export default app
