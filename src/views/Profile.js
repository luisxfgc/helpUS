import React from 'react'
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

export default function Profile(props) {
  return (
    <NativeBaseProvider>
      <ScrollView>
        <Center flex={'1'} mt={'4'}>
          <VStack space={'4'}>
            <VStack alignItems={'center'} space={'4'}>
              <Avatar size={'2xl'} />
              <Heading>teste</Heading>
            </VStack>
            <Button variant={'ghost'}>Editar Perfil</Button>
          </VStack>
        </Center>
      </ScrollView>
    </NativeBaseProvider>
  )
}
