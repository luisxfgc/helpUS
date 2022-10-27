import React, { useContext } from 'react'
import {
  NativeBaseProvider,
  Box,
  Button,
  Heading,
  Center,
  Pressable,
  Text,
} from 'native-base'

import { AuthContext } from '../Providers/AuthContext'

export default function Settings() {
  const { signOut } = useContext(AuthContext)
  return (
    <NativeBaseProvider>
      <Center flex={'1'} alignItems={'center'} justifyContent={'center'}>
        <Box>
          <Heading py={'4'}>Teste para Sair</Heading>
          <Pressable onPress={signOut} _pressed={{ color: '#4A4E69' }}>
            <Text>Sair</Text>
          </Pressable>
        </Box>
      </Center>
    </NativeBaseProvider>
  )
}
