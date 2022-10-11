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
      <Center m={5}>
        <Heading>Usuários</Heading>
        <Stack space={2}>
          {user.map((user) => {
            return (
              <Box>
                <Text key={user.nome}>
                  {user.nome} {user.endereco}
                </Text>
              </Box>
            )
          })}
        </Stack>
      </Center>
    </NativeBaseProvider>
  )
}
