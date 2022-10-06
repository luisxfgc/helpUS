import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './src/views/Login'
import Dashboard from './src/views/Dashboard'
import Register from './src/views/Register'
import PasswordRecovery from './src/views/PasswordRecovery'
import LoginNativeBase from './src/views/LoginNativeBase'
// Ignore Errors
import { LogBox } from 'react-native'
LogBox.ignoreLogs(['EventEmitter.removeListener'])

const Stack = createNativeStackNavigator()

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginNativeBase">
        <Stack.Screen
          name="LoginNativeBase"
          component={LoginNativeBase}
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
        <Stack.Screen name="PasswordRecovery" component={PasswordRecovery} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
