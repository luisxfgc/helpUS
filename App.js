import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import * as React from 'react'

import Dashboard from './src/views/Dashboard'
import Login from './src/views/Login'
import PasswordRecovery from './src/views/PasswordRecovery'
import Register from './src/views/Register'

// Ignore Errors
import { LogBox } from 'react-native'
LogBox.ignoreLogs(['EventEmitter.removeListener'])

const Stack = createNativeStackNavigator()
const isLoggedIn = false

const Navigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
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
        name="PasswordRecovery"
        component={PasswordRecovery}
        options={{ title: 'Recuperar sua conta' }}
      />
    </Stack.Navigator>
  )
}

function App() {
  return (
    <NavigationContainer>
      {!isLoggedIn ? (
        <Navigator />
      ) : (
        <Stack.Navigator initialRouteName="Dashboard">
          <Stack.Screen name="Dashboard" component={Dashboard} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  )
}

export default App
