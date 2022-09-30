import React, { useState } from 'react'
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { auth } from '../config/firebase'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleCreateAccount = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        let user = userCredential.user
        navigation.navigate('Dashboard')
        // ...
      })
      .catch((error) => {
        console.log(error.message)
      })
  }
  return (
    <View style={styles.container}>
      <View style={styles.subcontainer}>
        <View>
          <Text style={styles.title}>Fazer Login</Text>
        </View>
        <TextInput
          placeholder="Endereço de email"
          value={email}
          autoCapitalize="none"
          onChangeText={(email) => setEmail(email)}
        />
        <TextInput
          placeholder="Senha"
          value={password}
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
        <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
          <Text>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  subcontainer: {
    margin: 50,
    justifyContent: 'center',
  },
})
