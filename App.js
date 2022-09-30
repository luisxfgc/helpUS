import * as React from 'react'
import { View, Text, Button } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './src/views/Login'
import Dashboard from './src/views/Dashboard'
import Register from './src/views/Register'
import { auth } from './src/config/firebase'

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Bem-vindo</Text>
    </View>
  )
}

const Stack = createNativeStackNavigator()

function App({ navigation }) {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={() => {
            return {
              headerRight: () => (
                <Button
                  type="clear"
                  title="Sair"
                  onPress={() => {
                    auth.signOut()
                  }}
                />
              ),
            }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
