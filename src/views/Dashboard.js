import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Octicons } from '@expo/vector-icons'
import { firebase } from '../config/firebase'
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

  const currentUserId = firebase.auth().currentUser.uid

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
                navigation.navigate('AddUser', { id: '1' })
              }}
            >
              <Octicons name="person-add" size={20} color="#495059" />
            </Pressable>
          </NativeBaseProvider>
        )
      },
    })
    firebase
      .firestore()
      .collection('users')
      .onSnapshot((query) => {
        let listUsers = []
        query.forEach((doc) => {
          listUsers.push({
            ...doc.data(),
            id: doc.id,
            name: doc.data().name,
          })
        })
        setUser(listUsers)
      })
  }, [navigation])

  const addFriends = () => {
    const currentUser = firebase.auth().currentUser.uid
    firebase.firestore().collection('friendlist').doc(currentUser).set(user)
  }

  return (
    <NativeBaseProvider>
      <ScrollView>
        <Box flex={1} m={'6'}>
          <Stack space={'4'} mt={'2'}>
            {user.map((user) => {
              return (
                <Box key={user.id} p={'6'} rounded={'2xl'} bgColor={'white'}>
                  <HStack
                    mb={'2.5'}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                  >
                    <HStack alignItems={'center'} space={'1'}>
                      <Avatar size={'xs'} />
                      <Heading fontSize={'18'} color={'#495059'}>
                        {user.name}
                      </Heading>
                    </HStack>
                    <Pressable
                      onPress={addFriends}
                      bg={'#22223b'}
                      py={'2'}
                      px={'4'}
                      rounded={'md'}
                    >
                      <Octicons name="plus" color={'white'} />
                    </Pressable>
                  </HStack>
                  <Divider mb={'4'} bg={'muted.50'} />
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
      <Center position={'absolute'} bottom={'4'} left={'0'} right={'0'}>
        <Pressable
          py={'3'}
          px={'6'}
          rounded={'full'}
          bgColor="#ef233c"
          _pressed={{ bg: '#d90429' }}
        >
          <HStack alignItems={'center'} justifyContent={'center'} space={'2'}>
            <Octicons name="alert" color="white" />
            <Text color={'white'} fontSize={'md'}>
              Preciso de ajuda!
            </Text>
          </HStack>
        </Pressable>
      </Center>
    </NativeBaseProvider>
  )
}
