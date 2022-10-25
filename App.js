import React, { useEffect, useMemo, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'

import Dashboard from './src/views/Dashboard'
import Login from './src/views/Login'
import PasswordRecovery from './src/views/PasswordRecovery'
import Register from './src/views/Register'

import { AuthContext } from './src/providers/context'

// Ignore Errors
import { ActivityIndicator, LogBox, View } from 'react-native'
LogBox.ignoreLogs(['EventEmitter.removeListener'])

const Stack = createNativeStackNavigator()

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [userToken, setUserToken] = useState(null)

  const authContext = useMemo(() => ({
    signIn: () => {
      setUserToken('123')
      setIsLoading(false)
    },
    signUp: () => {
      setUserToken('123')
      setIsLoading(false)
    },
    signOut: () => {
      setUserToken(null)
      setIsLoading(false)
    },
  }))

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#22223b" />
      </View>
    )
  }
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {userToken !== null ? (
          <Stack.Screen name="Dashboard" component={Dashboard} />
        ) : (
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            ,
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerShown: false }}
            />
            ,
            <Stack.Screen
              name="PasswordRecovery"
              component={PasswordRecovery}
              options={{ title: 'Recuperar sua conta' }}
            />
            ,
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  )
}

export default App
