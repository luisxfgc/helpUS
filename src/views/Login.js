import React, { useState } from 'react'
import { auth } from '../config/firebase'
import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native'

export default function Login({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = () => {
    setIsLoading(true)
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var user = userCredential.user
        navigation.navigate('Dashboard')
      })
      .catch((error) => {
        setIsLoading(false)
        if (email === '' || password === '') {
          Alert.alert(
            'Ocorreu uma falha ao tentar realizar o login',
            'Email ou senha estão vazios' +
              '\n' +
              '\n' +
              'Erro completo:' +
              '\n' +
              error.message
          )
        }
        console.log(error.message)
      })
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Image
          source={require('../assets/login_image.png')}
          style={styles.headerImage}
        />
        <View style={styles.subcontainer}>
          <Text style={styles.title}>Entrar no helpUS</Text>
          <Text style={styles.subtitle}>
            Preencha seus dados para entre ou cria sua conta caso ainda não
            tenha.
          </Text>
          <View style={styles.form}>
            <TextInput
              keyboardType="email"
              style={styles.input}
              placeholder="Endereço de email"
              value={email}
              autoCapitalize="none"
              onChangeText={(email) => setEmail(email)}
            />
            <TextInput
              style={styles.input}
              placeholder="Senha"
              value={password}
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />
            <Pressable onPress={() => navigation.navigate('PasswordRecovery')}>
              <Text
                style={{
                  paddingVertical: 10,
                  color: '#4C4D4F',
                  opacity: 0.6,
                }}
              >
                Esqueci minha senha
              </Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.containerButton}>
          <TouchableOpacity style={styles.buttonLogin} onPress={handleSubmit}>
            {isLoading ? (
              <ActivityIndicator size={25} color="white" />
            ) : (
              <Text style={{ color: '#eeeeee', fontSize: 18 }}>Entrar</Text>
            )}
          </TouchableOpacity>
          <Text
            style={{
              fontWeight: 'bold',
              alignSelf: 'center',
              color: '#4C4D4F',
              opacity: 0.5,
              padding: 5,
            }}
          >
            OU
          </Text>
          <TouchableOpacity
            style={styles.buttonRegister}
            onPress={() => navigation.push('Register')}
          >
            <Text style={{ color: '#eeeeee', fontSize: 18 }}>
              Crie sua conta
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: '20%',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginHorizontal: 32,
  },
  subcontainer: {
    width: '100%',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerImage: {
    width: '60%',
    height: '25%',
    alignSelf: 'center',
  },
  form: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  containerButton: {
    width: '100%',
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    paddingVertical: 10,
    color: '#2E2E2E',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 25,
    color: '#4C4D4F',
    opacity: 0.7,
  },
  input: {
    width: '100%',
    fontSize: 14,
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: '#f6f6f6',
  },
  buttonLogin: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#22223b',
    borderRadius: 10,
    elevation: 1,
    marginVertical: 10,
  },
  buttonRegister: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#4A4E69',
    borderRadius: 10,
    elevation: 1,
    marginTop: 10,
  },
})
