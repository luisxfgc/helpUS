import React, { useState, useEffect } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'

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
  Box,
  ScrollView,
} from 'native-base'

export default function Register({ navigation }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const storage = getStorage()
      const ref = ref(storage, 'image.jpg')
      const img = await fetch(result.uri)
      const bytes = await img.blob()

      await uploadBytes(ref, bytes)
    }
  };

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
      <ScrollView>
        <Center flex={'1'} p={'8'} mt={'12'}>
          <Stack alignItems="center" mb="5" space={2}>
            <Heading size="xl" fontWeight="black" color={'#495057'}>
              Criar sua nova conta
            </Heading>
            <Text color={'#6c757d'} opacity="0.7">
              Preencha seus dados corretamente para a criação da sua conta.
              Recomendamos que você crie sua conta quando estiver com tempo
              livre e com calma. Você pode alterar seus dados depois.
            </Text>
          </Stack>
          <Box px={'8'} py={'4'}>
            <Text fontSize={'sm'} fontWeight={'semibold'} color={'#6c757d'}>Upload foto de perfil</Text>
          </Box>
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
                  leftIcon={
                    <MaterialIcons name="dangerous" color={'#F13636'} />
                  }
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
                  leftIcon={
                    <MaterialIcons name="dangerous" color={'#F13636'} />
                  }
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
                  leftIcon={
                    <MaterialIcons name="dangerous" color={'#F13636'} />
                  }
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
                  leftIcon={
                    <MaterialIcons name="dangerous" color={'#F13636'} />
                  }
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
        </ScrollView>
    </NativeBaseProvider>
  )
}
