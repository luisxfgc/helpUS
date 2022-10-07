import React, { useState } from 'react'
import { auth } from '../config/firebase'
import { MaterialIcons } from '@expo/vector-icons'
import {
  NativeBaseProvider,
  Center,
  FormControl,
  Stack,
  Input,
  Icon,
  Text,
  Button,
  Heading,
  Pressable,
} from 'native-base'

export default function LoginNativeBase({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var user = userCredential.user
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
            Entrar
          </Heading>
          <Text>Insira seus dados para entrar ou crie uma conta.</Text>
        </Stack>
        <FormControl isRequired>
          <Stack space={5}>
            <Stack>
              <FormControl.Label>Email</FormControl.Label>
              <Input
                InputLeftElement={
                  <Icon
                    as={<MaterialIcons name="mail" />}
                    size={5}
                    ml="2"
                    color="muted.400"
                  />
                }
                variant={'filled'}
                autoCapitalize="none"
                p={2}
                placeholder="Email"
                onChangeText={(email) => setEmail(email)}
              />
            </Stack>
            <Stack>
              <FormControl.Label>Password</FormControl.Label>
              <Input
                InputLeftElement={
                  <Icon
                    as={<MaterialIcons name="lock" />}
                    size={5}
                    ml="2"
                    color="muted.400"
                  />
                }
                variant={'filled'}
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
                p={'4'}
                shadow={'1'}
                onPress={handleSubmit}
                bgColor="#22223b"
                _pressed={{ bg: '#4A4E69' }}
              >
                Entrar
              </Button>
              <Pressable
                onPress={() => {
                  navigation.navigate('Register')
                }}
              >
                <Text color="#22223b" alignSelf="center">
                  Crie uma conta agora!
                </Text>
              </Pressable>
            </Stack>
          </Stack>
        </FormControl>
      </Center>
    </NativeBaseProvider>
  )
}
