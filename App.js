import React, { useEffect, useMemo, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'

import Dashboard from './src/views/Dashboard'
import Login from './src/views/Login'
import PasswordRecovery from './src/views/PasswordRecovery'
import Register from './src/views/Register'
import Settings from './src/views/Settings'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { AuthContext } from './src/providers/context'

// Ignore Errors
import { ActivityIndicator, LogBox, View } from 'react-native'
LogBox.ignoreLogs(['EventEmitter.removeListener'])

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function HomePage() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName
          size = 22

          if (route.name === 'Dashboard') {
            iconName = focused ? 'home' : 'home-outline'
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline'
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: '#4A4E69',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  )
}

function AuthPages() {
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
  const [isLoading, setIsLoading] = useState(false)
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
          <Stack.Screen name="HomePage" component={HomePage} />
        ) : (
          <AuthPages />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  )
}

export default App
