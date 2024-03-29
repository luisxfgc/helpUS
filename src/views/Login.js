import React, { useContext, useState } from 'react'
import { Alert, SafeAreaView, ToastAndroid } from 'react-native'
import { Octicons } from '@expo/vector-icons'
import { firebase } from '../config/firebase'

import {
  NativeBaseProvider,
  Image,
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
  VStack,
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
        console.log('Login Realizado com sucesso', user.uid)
        return navigation.navigate('HomePage')
      })
      .catch((error) => {
        Alert.alert('Erro ao fazer Login', error.message)
        console.log('Erro ao fazer Login', error.message)
      })
  }

  return (
    <NativeBaseProvider>
      <SafeAreaView>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
          }}
          alt="Imagem principal, pessoas de mãos dadas"
          size={'xl'}
          w={'full'}
          h={'48'}
        />
        <Center p={'8'}>
          <Stack alignItems="center" mb="5" space={'8'}>
            <VStack alignItems={'center'} space={'2'}>
              <Heading size="xl" fontWeight={'bold'} color={'#495057'}>
                Bem-vindo ao helpUS
              </Heading>
              <Text color={'#6c757d'} opacity="0.9" textAlign={'center'}>
                Utilize suas credenciais para entrar ou crie uma conta!
              </Text>
            </VStack>
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
                    <Text fontSize={'sm'} color={'muted.400'}>
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
