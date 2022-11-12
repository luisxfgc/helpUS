import React, { useContext, useState } from 'react'
import { Alert, SafeAreaView, ToastAndroid } from 'react-native'
import { Octicons } from '@expo/vector-icons'
import { firebase } from '../config/firebase'

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
  Divider,
  HStack,
} from 'native-base'

export default function Login({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)

  const handleSubmit = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user
        ToastAndroid.show(
          'Login Realizado com sucesso!',
          ToastAndroid.BOTTOM,
          ToastAndroid.LONG
        )
        navigation.navigate('Dashboard')
        console.log('Login Realizado com sucesso, bem-vindo ', user.email)
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
            <Heading size="2xl" fontWeight={'bold'} color={'#495057'}>
              Fazer login
            </Heading>
            <Text color={'#6c757d'} opacity="0.9">
              Utilize suas credenciais para entrar ou crie uma conta!
            </Text>
          </Stack>
          <FormControl isRequired>
            <Stack space={2}>
              <Stack>
                <FormControl.Label>Email</FormControl.Label>
                <Input
                  InputLeftElement={
                    <Icon
                      as={<Octicons name="mail" />}
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
                      as={<Octicons name="lock" />}
                      size={4}
                      ml="2"
                      color="#ddbea9"
                    />
                  }
                  InputRightElement={
                    <Pressable onPress={() => setShow(!show)}>
                      <Icon
                        as={<Octicons name={show ? 'eye' : 'eye-closed'} />}
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
              <Stack space={'4'} mt={'2'}>
                <Button
                  p={'4'}
                  rounded={'full'}
                  onPress={handleSubmit}
                  bgColor="#22223b"
                >
                  Entrar
                </Button>
                <Center w={'full'}>
                  <HStack alignItems={'center'} space={'4'}>
                    <Divider w={'1/4'} bgColor={'muted.200'} />
                    <Text fontSize={'xs'} color={'muted.400'}>
                      Ou você pode
                    </Text>
                    <Divider w={'1/4'} bgColor={'muted.200'} />
                  </HStack>
                </Center>
                <Button
                  p={'4'}
                  rounded={'full'}
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
      </SafeAreaView>
    </NativeBaseProvider>
  )
}
