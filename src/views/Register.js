import React, { useState } from 'react'
import { auth } from '../config/firebase'
import {
  NativeBaseProvider,
  Center,
  FormControl,
  Stack,
  Input,
  Text,
  Button,
  Heading,
} from 'native-base'

export default function Register({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleCreateAccount = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        let user = userCredential.user
        navigation.navigate('Dashboard')
      })
      .catch((error) => {
        console.log(error.message)
      })
  }
  return (
    <NativeBaseProvider>
      <Center maxW={'80%'} height={'full'} m={'10'}>
        <Stack alignItems="center" mb="5" space={2}>
          <Heading size="2xl" fontWeight="black">
            Criar sua conta
          </Heading>
          <Text>Insira seus dados para entrar ou crie uma conta.</Text>
        </Stack>
        <FormControl isRequired>
          <Stack space={5}>
            <Stack>
              <FormControl.Label>Email</FormControl.Label>
              <Input
                variant={'filled'}
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
                variant={'filled'}
                type="password"
                p={2}
                placeholder="Password"
                onChangeText={(password) => setPassword(password)}
              />
            </Stack>
            <Stack space={4} mt="5">
              <Button
                p={'4'}
                shadow={'1'}
                onPress={handleCreateAccount}
                bgColor="#22223b"
                _pressed={{ bg: '#4A4E69' }}
              >
                Criar minha conta
              </Button>
            </Stack>
          </Stack>
        </FormControl>
      </Center>
    </NativeBaseProvider>
  )
}
