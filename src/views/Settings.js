import React, { useContext } from 'react'
import { Octicons } from '@expo/vector-icons'
import { firebase } from '../config/firebase'
import {
  NativeBaseProvider,
  Box,
  Button,
  Heading,
  Center,
  Pressable,
  Text,
  HStack,
  VStack,
} from 'native-base'

export default function Settings() {
  const signOut = () => {
    firebase.auth().signOut()
  }
  return (
    <NativeBaseProvider>
      <Box flex={'1'} m={'6'} justifyContent={'space-between'}>
        <VStack space={'8'}>
          <Pressable onPress={signOut} _pressed={{ color: '#4A4E69' }}>
            <HStack space={'2'} alignItems={'center'}>
              <Octicons name="note" size={20} color="#969696" />
              <Text color={'gray.800'}>Termos do aplicativo</Text>
            </HStack>
          </Pressable>
          <Pressable onPress={signOut} _pressed={{ color: '#4A4E69' }}>
            <HStack space={'2'} alignItems={'center'}>
              <Octicons name="person" size={20} color="#969696" />
              <Text color={'gray.800'}>Créditos</Text>
            </HStack>
          </Pressable>
          <Pressable onPress={signOut} _pressed={{ color: '#4A4E69' }}>
            <HStack space={'2'} alignItems={'center'}>
              <Octicons name="sign-out" size={20} color="#969696" />
              <Text color={'gray.800'}>Sair</Text>
            </HStack>
          </Pressable>
        </VStack>
        <Box alignSelf={'center'} justifyItems={'flex-end'}>
          <VStack alignItems={'center'}>
            <Text color={'gray.400'} fontWeight={'bold'} fontSize={'10'}>
              helpUS
            </Text>
            <Text color={'gray.400'} fontSize={'10'}>
              Versão 1.0 - todos os direitos reservados, 2022-2023.
            </Text>
          </VStack>
        </Box>
      </Box>
    </NativeBaseProvider>
  )
}
