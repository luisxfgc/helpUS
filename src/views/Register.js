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

export default function Register({ navigation }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)

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
      <Center height={'full'} m={'10'} justifyContent={'center'}>
        <Stack alignItems="center" mb="5" space={2}>
          <Heading size="2xl" fontWeight="black">
            Criar sua conta
          </Heading>
          <Text>Insira seus dados para entrar ou crie uma conta.</Text>
        </Stack>
        <FormControl isRequired>
          <Stack space={2}>
            <Stack>
              <FormControl.Label>Nome</FormControl.Label>
              <Input
                InputLeftElement={
                  <Icon
                    as={<MaterialIcons name="person-outline" />}
                    size={4}
                    ml="4"
                    color="#ddbea9"
                  />
                }
                variant={'filled'}
                type="text"
                autoCapitalize="words"
                p={2}
                placeholder="Nome completo"
                onChangeText={(name) => setName(name)}
              />
            </Stack>
            <Stack>
              <FormControl.Label>Telefone</FormControl.Label>
              <Input
                InputLeftElement={
                  <Icon
                    as={<MaterialIcons name="phone-iphone" />}
                    size={4}
                    ml="4"
                    color="#ddbea9"
                  />
                }
                variant={'filled'}
                type="email"
                autoCapitalize="none"
                p={2}
                placeholder="Número de telefone"
                onChangeText={(phone) => setPhone(phone)}
              />
            </Stack>
            <Stack>
              <FormControl.Label>E-mail</FormControl.Label>
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
                type="email"
                autoCapitalize="none"
                p={2}
                placeholder="Endereço de e-mail"
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
                      color="muted.200"
                    />
                  </Pressable>
                }
                variant={'filled'}
                p={2}
                placeholder="Sua senha"
                onChangeText={(password) => setPassword(password)}
              />
            </Stack>
            <Stack mt="5">
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
