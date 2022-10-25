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

let app

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app()
}

export const db = firebase.firestore()
export const auth = firebase.auth()

// export const createUserDocument = async (user, name, phone) => {
//   if (!user) return
//   const userRef = db.doc(`users/${user.uid}`)
//   const snapshot = await userRef.get()

//   if (!snapshot.exists) {
//     const { email } = user
//     const { name } = name
//     const { phone } = phone
//     try {
//       userRef.set({
//         user,
//         name,
//         phone,
//       })
//     } catch (error) {
//       console.log('Register user error:', error)
//     }
//   }
// }

export default app
