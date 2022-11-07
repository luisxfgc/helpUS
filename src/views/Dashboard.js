import React, { useState, useEffect } from 'react'
import { firebase } from '../Config/firebase'
import { useNavigation } from '@react-navigation/native'
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
              mx={'6'}
              onPress={() => {
                navigation.navigate('AddUser')
              }}
            >
              <MaterialIcons
                name="person-add-alt-1"
                size={24}
                color="#495059"
              />
            </Pressable>
          </NativeBaseProvider>
        )
      },
      headerSearchBarOptions: {
        placeholder: 'Search',
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
        <Box flex={1} m={'4'}>
          <Stack space={'8'} mt={'4'}>
            {user.map((user) => {
              return (
                <Box key={user.id}>
                  <Heading color={'#495059'} mb={'2'}>
                    {user.name}
                  </Heading>
                  <VStack space={'1'}>
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
