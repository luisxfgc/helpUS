import { View, Text } from 'react-native'
import React from 'react'

export default function AddUser(props) {
  return (
    <View>
      <Text>Adicionar um amigo {props.route.params.id}</Text>
    </View>
  )
}
