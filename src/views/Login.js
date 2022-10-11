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
  const [show, setShow] = useState(false)

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
      <Center height={'full'} p={'8'}>
        <Stack alignItems="center" mb="5" space={2}>
          <Heading size="2xl" fontWeight="black">
            Fazer login
          </Heading>
          <Text>Insira seus dados para entrar ou crie uma conta.</Text>
        </Stack>
        <FormControl isRequired>
          <Stack space={2}>
            <Stack>
              <FormControl.Label>Email</FormControl.Label>
              <Input
                InputLeftElement={
                  <Icon
                    as={<MaterialIcons name="mail-outline" />}
                    size={4}
                    ml="4"
                    color="#ddbea9"
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
              <FormControl.Label>Senha</FormControl.Label>
              <Input
                type={show ? 'text' : 'password'}
                InputLeftElement={
                  <Icon
                    as={<MaterialIcons name="lock-outline" />}
                    size={4}
                    ml="4"
                    color="#ddbea9"
                  />
                }
                InputRightElement={
                  <Pressable onPress={() => setShow(!show)}>
                    <Icon
                      as={
                        <MaterialIcons
                          name={show ? 'visibility' : 'visibility-off'}
                        />
                      }
                      size={4}
                      mr="4"
                      color="muted.400"
                    />
                  </Pressable>
                }
                variant={'filled'}
                p={2}
                autoCapitalize="none"
                placeholder="Sua senha"
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
                m={5}
                onPress={() => {
                  navigation.navigate('Register')
                }}
              >
                <Text color="#457b9d" alignSelf="center">
                  Não tem uma conta? Registre-se agora!
                </Text>
              </Pressable>
            </Stack>
          </Stack>
        </FormControl>
      </Center>
    </NativeBaseProvider>
  )
}
