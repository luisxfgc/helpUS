import React, { useState } from 'react'
import { Image } from 'react-native'
import { auth } from '../config/firebase'
import {
  NativeBaseProvider,
  Center,
  FormControl,
  Stack,
  Input,
  Text,
  Button,
  Alert,
  Divider,
  Heading,
  VStack,
} from 'native-base'

export default function LoginNativeBase({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const img = require('../assets/login_image.png')

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
          Alert.alert(
            'Please enter your email and password',
            'error',
            error.message
          )
        }
      })
      .finally(() => {
        setIsLoading(false)
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
            </Stack>
            <Stack space={2} mt="5">
              <Button p={'3'} onPress={handleSubmit}>
                Entrar
              </Button>
              <Divider alignSelf="center" w="90%" />
              <Button p={'3'} onPress={() => navigation.push('Register')}>
                Criar uma conta
              </Button>
            </Stack>
          </Stack>
        </FormControl>
      </Center>
    </NativeBaseProvider>
  )
}
