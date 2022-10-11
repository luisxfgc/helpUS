import React, { useState, useEffect } from 'react'
import { db } from '../config/firebase'
import { MaterialIcons } from '@expo/vector-icons'
import {
  NativeBaseProvider,
  Center,
  Stack,
  Input,
  Icon,
  Text,
  Box,
  Heading,
  Pressable,
  HStack,
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
      <Center m={5} maxW={'80%'}>
        <Heading>Usuários</Heading>
        <Stack space={2} mt={10}>
          {user.map((user) => {
            return (
              <Box width={'100%'}>
                <HStack key={user.id} space={2} alignItems="center">
                  <Heading>{user.nome}</Heading>
                  <Text>{user.endereco}</Text>
                </HStack>
              </Box>
            )
          })}
        </Stack>
      </Center>
    </NativeBaseProvider>
  )
}
