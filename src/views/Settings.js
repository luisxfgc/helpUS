import React, { useContext } from 'react'
import { NativeBaseProvider, Box, Button, Heading, Center } from 'native-base'

import { AuthContext } from '../Providers/context'

export default function Settings() {
  const { signOut } = useContext(AuthContext)
  return (
    <NativeBaseProvider>
      <Center flex={'1'} alignItems={'center'} justifyContent={'center'}>
        <Box>
          <Heading>Teste para Sair</Heading>
          <Button
            p={'4'}
            rounded={'full'}
            onPress={signOut}
            bgColor="#22223b"
            _pressed={{ bg: '#4A4E69' }}
          >
            Sair
          </Button>
        </Box>
      </Center>
    </NativeBaseProvider>
  )
}
