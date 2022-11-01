import React, { useState, useEffect } from 'react'
import { db } from '../Config/firebase'
// import { MaterialIcons } from '@expo/vector-icons'
import {
  NativeBaseProvider,
  Center,
  Stack,
  Text,
  Box,
  Heading,
  VStack,
  HStack,
  Pressable,
  ScrollView,
} from 'native-base'

export default function Dashboard() {
  const [user, setUser] = useState([])

  useEffect(() => {
    db.collection('users').onSnapshot((query) => {
      const listUsers = []
      query.forEach((doc) => {
        listUsers.push({
          ...doc.data(),
          id: doc.id,
          name: doc.data().name,
        })
      })
      setUser(listUsers)
    })
  }, [])

  return (
    <NativeBaseProvider>
      <ScrollView>
        <Center flex={1} mx={'4'}>
          <Stack space={'8'} mt={'4'}>
            {user.map((user) => {
              return (
                <Box key={user.id}>
                  <Heading color={'#495059'}>{user.name}</Heading>
                  <VStack space={'4'}>
                    <Text>Email: {user.email}</Text>
                    <Text>Telefone: {user.phone}</Text>
                    <Text>Endereço: {user.adress}</Text>
                    <Text>Descrição: {user.description}</Text>
                  </VStack>
                </Box>
              )
            })}
          </Stack>
        </Center>
      </ScrollView>
    </NativeBaseProvider>
  )
}
