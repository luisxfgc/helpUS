import React, { useState } from 'react'
import { Alert } from 'react-native'
import { auth } from '../config/firebase'
import {
  NativeBaseProvider,
  Center,
  FormControl,
  Stack,
  Input,
  Text,
  Button,
  Divider,
  Heading,
  Pressable,
} from 'native-base'

export default function LoginNativeBase({ navigation }) {
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
        if (email === '' || password === '') {
          // Alert.alert(
          //   'Please enter your email and password',
          //   'error',
          //   error.message
          // )
          error.message
        }
        console.log(error.message)
      })
  }

  return (
    <NativeBaseProvider>
      <Center maxW={'80%'} height={'full'} m={'10'}>
        <Stack alignItems="center" mb="5" space={2}>
          <Heading size="2xl" fontWeight="black">
            Entrar
          </Heading>
          <Text>Insira seus dados para entrar ou crie uma conta.</Text>
        </Stack>
        <FormControl isRequired>
          <Stack space={5}>
            <Stack>
              <FormControl.Label>Email</FormControl.Label>
              <Input
                type="email"
                autoCapitalize="none"
                p={2}
                placeholder="Email"
                onChangeText={(email) => setEmail(email)}
              />
            </Stack>
            <Stack>
              <FormControl.Label>Password</FormControl.Label>
              <Input
                type="password"
                p={2}
                placeholder="Password"
                onChangeText={(password) => setPassword(password)}
              />
              <Pressable
                py={5}
                onPress={() => navigation.push('PasswordRecovery')}
              >
                <Text color={'#4C4D4F'} opacity="0.5" fontSize={'xs'}>
                  Esqueceu sua senha?
                </Text>
              </Pressable>
            </Stack>
            <Stack space={4} mt="5">
              <Button
                p={'3'}
                shadow={'2'}
                onPress={handleSubmit}
                bgColor="#22223b"
                _pressed={{ bg: '#4A4E69' }}
              >
                Entrar
              </Button>
              <Divider alignSelf="center" w="60%" />
              <Button
                p={'3'}
                shadow={'2'}
                onPress={() => {
                  navigation.push('Register')
                }}
                bgColor="#4A4E69"
                _pressed={{ bg: '#22223b' }}
              >
                Criar uma conta
              </Button>
            </Stack>
          </Stack>
        </FormControl>
      </Center>
    </NativeBaseProvider>
  )
}
