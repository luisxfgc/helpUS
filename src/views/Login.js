import React, { useContext, useState } from 'react'

import { Alert, SafeAreaView, ToastAndroid } from 'react-native'

import { MaterialIcons } from '@expo/vector-icons'

import { auth } from '../Config/firebase'

import { AuthContext } from '../Providers/context'

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

  const { signIn } = useContext(AuthContext)

  const handleSubmit = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var user = userCredential.user
        navigation.navigate('HomePage', { screen: 'Dashboard' })
        ToastAndroid.show('Login', ToastAndroid.BOTTOM, ToastAndroid.LONG)
      })
      .catch((error) => {
        Alert.alert('Erro ao fazer Login', error.message)
        console.log(error.message)
      })
  }

  return (
    <NativeBaseProvider>
      <SafeAreaView>
        <Center height={'full'} p={'8'}>
          <Stack alignItems="center" mb="5" space={2}>
            <Heading size="xl" fontWeight="black" color={'#495057'}>
              Fazer Login
            </Heading>
            <Text color={'#6c757d'} opacity="0.7">
              Insira seus dados para entrar ou crie uma conta.
            </Text>
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
                      ml="2"
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
                      ml="2"
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
              <Stack space={'4'} mt={'4'}>
                <Button
                  p={'4'}
                  rounded={'full'}
                  onPress={(handleSubmit, signIn)}
                  bgColor="#22223b"
                  _pressed={{ bg: '#4A4E69' }}
                >
                  Entrar
                </Button>
                <Pressable
                  p={'4'}
                  rounded={'full'}
                  borderWidth="1"
                  onPress={() => {
                    navigation.navigate('Register')
                  }}
                  _pressed={{ borderColor: '#4A4E69' }}
                >
                  <Text color="#4A4E69" alignSelf="center">
                    Criar uma conta
                  </Text>
                </Pressable>
              </Stack>
            </Stack>
          </FormControl>
        </Center>
      </SafeAreaView>
    </NativeBaseProvider>
  )
}
