import React, { useState, useEffect } from 'react'

import { db } from '../Config/firebase'

import { MaterialIcons } from '@expo/vector-icons'

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
        listUsers.push({ ...doc.data(), id: doc.id })
      })
      setUser(listUsers)
    })
  }, [])

  return (
    <NativeBaseProvider>
      <ScrollView>
        <Center flex={1} mx={'4'}>
          <Stack space={'4'} mt={'10'}>
            {user.map((user) => {
              return (
                <Box key={user.id}>
                  <Box mb={'4'} p={'4'}>
                    <Box
                      justifyContent={'space-between'}
                      flexDirection={'row'}
                      alignItems={'center'}
                      mb={'2'}
                    >
                      <HStack alignItems={'center'} space={'2'}>
                        <Heading
                          size={'lg'}
                          fontWeight="semibold"
                          color={'#495057'}
                        >
                          {user.nome}
                        </Heading>
                        <Text>{user.email}</Text>
                      </HStack>
                      <Pressable
                        bgColor="#22223b"
                        px={'4'}
                        py={'2'}
                        rounded={'md'}
                        flexDirection={'row'}
                        alignItems={'center'}
                        justifyContent={'space-between'}
                      >
                        <Text color={'white'} mr={'1'}>
                          Pedir Ajuda
                        </Text>
                        <MaterialIcons name="add" size={12} color={'white'} />
                      </Pressable>
                    </Box>
                    <HStack alignItems={'center'} space={'2'}>
                      <Text fontWeight={'semibold'}>Endereço</Text>
                      <Text>{user.endereco}</Text>
                    </HStack>
                    <Text>{user.descricao}</Text>
                  </Box>
                </Box>
              )
            })}
          </Stack>
        </Center>
      </ScrollView>
    </NativeBaseProvider>
  )
}
