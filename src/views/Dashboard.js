import React, { useState, useEffect } from 'react'
import { firebase } from '../Config/firebase'
import { useNavigation } from '@react-navigation/native'
import { Octicons } from '@expo/vector-icons'
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
  Divider,
  Avatar,
  Button,
} from 'native-base'

export default function Dashboard() {
  const [user, setUser] = useState([])

  const navigation = useNavigation()

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Seus amigos',
      headerRight: () => {
        return (
          <NativeBaseProvider>
            <Pressable
              alignItems={'center'}
              justifyContent={'center'}
              mt={'4'}
              mx={'8'}
              onPress={() => {
                navigation.navigate('AddUser')
              }}
            >
              <Octicons name="person-add" size={20} color="#495059" />
            </Pressable>
          </NativeBaseProvider>
        )
      },
    })
  }, [navigation])

  useEffect(() => {
    firebase
      .firestore()
      .collection('users')
      .onSnapshot((query) => {
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
        <Box flex={1} m={'6'}>
          <Stack space={'4'} mt={'2'}>
            {user.map((user) => {
              return (
                <Box key={user.id} p={'6'} rounded={'2xl'} bgColor={'white'}>
                  <HStack
                    mb={'4'}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                  >
                    <HStack alignItems={'center'} space={'1'}>
                      <Avatar size={'xs'} />
                      <Heading fontSize={'18'} color={'#495059'}>
                        {user.name}
                      </Heading>
                    </HStack>
                    <Button size={'xs'}>Adicionar</Button>
                  </HStack>

                  <Divider mb={'4'} bg={'muted.100'} />
                  <VStack space={'2'} p={'4'} bg={'indigo.50'} rounded={'2xl'}>
                    <Text>Email: {user.email}</Text>
                    <Text>Telefone: {user.phone}</Text>
                    <Text>Endereço: {user.adress}</Text>
                  </VStack>
                </Box>
              )
            })}
          </Stack>
        </Box>
      </ScrollView>
    </NativeBaseProvider>
  )
}
