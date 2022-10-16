import { MaterialIcons } from '@expo/vector-icons'
import React, { useState, useEffect } from 'react'

import { auth } from '../config/firebase'

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
  const [error, setError] = useState(false)

  const handleCreateAccount = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var user = userCredential.user
        navigation.navigate('Dashboard')
        console.log(user)
        setError(false)
      })
      .catch((error) => {
        setError(true)
        console.log(error.message)
      })
  }
  return (
    <NativeBaseProvider>
      <Center height={'full'} p={'8'} justifyContent={'center'}>
        <Stack alignItems="center" mb="5" space={2}>
          <Heading size="xl" fontWeight="black" color={'#495057'}>
            Criar sua nova conta
          </Heading>
          <Text color={'#6c757d'} opacity="0.7">
            Preencha seus dados corretamente para a criação da sua conta.
            Recomendamos que você crie sua conta quando estiver com tempo livre
            e com calma. Você pode alterar seus dados depois.
          </Text>
        </Stack>
        <FormControl isRequired isInvalid={error}>
          <Stack space={2}>
            <Stack>
              <FormControl.Label>Nome</FormControl.Label>
              <Input
                InputLeftElement={
                  <Icon
                    as={<MaterialIcons name="person-outline" />}
                    size={4}
                    ml="2"
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
              <FormControl.ErrorMessage
                leftIcon={<MaterialIcons name="dangerous" color={'#F13636'} />}
              >
                Seu nome não pode estar vazio!
              </FormControl.ErrorMessage>
            </Stack>
            <Stack>
              <FormControl.Label>Telefone</FormControl.Label>
              <Input
                InputLeftElement={
                  <Icon
                    as={<MaterialIcons name="phone-iphone" />}
                    size={4}
                    ml="2"
                    color="#ddbea9"
                  />
                }
                variant={'filled'}
                type={phone}
                autoCapitalize="none"
                p={2}
                placeholder="Número de telefone"
                onChangeText={(phone) => setPhone(phone)}
              />
              <FormControl.ErrorMessage
                leftIcon={<MaterialIcons name="dangerous" color={'#F13636'} />}
              >
                Seu telefone não pode estar vazio!
              </FormControl.ErrorMessage>
            </Stack>
            <Stack>
              <FormControl.Label>E-mail</FormControl.Label>
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
                type="email"
                autoCapitalize="none"
                p={2}
                placeholder="Endereço de e-mail"
                onChangeText={(email) => setEmail(email)}
              />
              <FormControl.ErrorMessage
                leftIcon={<MaterialIcons name="dangerous" color={'#F13636'} />}
              >
                O Email não pode estar vazio!
              </FormControl.ErrorMessage>
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
              <FormControl.HelperText>
                A senha deve conter no mínimo 8 caracteres.
              </FormControl.HelperText>
              <FormControl.ErrorMessage
                leftIcon={<MaterialIcons name="dangerous" color={'#F13636'} />}
              >
                A senha não pode estar vazia!
              </FormControl.ErrorMessage>
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
