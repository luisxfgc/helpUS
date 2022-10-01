import React from 'react'
import {
  NativeBaseProvider,
  Box,
  Center,
  FormControl,
  Stack,
  Input,
  WarningOutlineIcon,
  Heading,
  Text,
} from 'native-base'

export function Form() {
  return (
    <Box>
      <Center height={'full'}>
        <Box alignItems={'center'} my={'20'}>
          <Heading>Criar uma Conta</Heading>
          <Text>insira seus dados para criar sua conta no helpUS</Text>
        </Box>
        <FormControl isRequired>
          <Stack mx="4" p="2">
            <FormControl.Label>Email</FormControl.Label>
            <Input type="email" placeholder="Digite seu email" />
            <FormControl.ErrorMessage
              color={'red.500'}
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              Insira um endereço de email válido
            </FormControl.ErrorMessage>
          </Stack>

          <Stack mx="4" p="2">
            <FormControl.Label>Senha</FormControl.Label>
            <Input type="password" placeholder="Digite sua senha" />
            <FormControl.HelperText>
              Must be atleast 6 characters.
            </FormControl.HelperText>
            <FormControl.ErrorMessage
              color={'red.500'}
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              Senha incorreta.
            </FormControl.ErrorMessage>
          </Stack>
        </FormControl>
      </Center>
    </Box>
  )
}

export default function LoginNativeBase() {
  return (
    <NativeBaseProvider>
      <Form />
    </NativeBaseProvider>
  )
}
