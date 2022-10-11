import React, { useState, useEffect } from 'react'
import { db } from '../config/firebase'
import {
  NativeBaseProvider,
  Center,
  Stack,
  Text,
  Box,
  Heading,
  VStack,
  Divider,
} from 'native-base'

export default function Dashboard() {
  const [user, setUser] = useState([])
  useEffect(() => {
    db.collection('users').onSnapshot((query) => {
      const listUsers = []
      query.forEach((doc) => {
        listUsers.push(doc.data())
      })
      setUser(listUsers)
    })
  }, [])

  return (
    <NativeBaseProvider>
      <Center m={10} maxW={'80%'}>
        <Heading>Usuários</Heading>
        <Stack space={2} mt={10}>
          {user.map((user) => {
            return (
              <Box width={'100%'}>
                <VStack key={user.id} alignItems="center">
                  <Box justifyContent={'space-between'}>
                    <Heading>{user.nome}</Heading>
                    <Text>{user.email}</Text>
                    <Text>{user.endereco}</Text>
                    <Text>{user.descricao}</Text>
                  </Box>
                  <Divider width={'full'} />
                </VStack>
              </Box>
            )
          })}
        </Stack>
      </Center>
    </NativeBaseProvider>
  )
}
