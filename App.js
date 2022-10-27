import React, { useEffect, useMemo, useState } from 'react'
import { ActivityIndicator, LogBox, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { AuthContext } from './src/Providers/AuthContext'
import FontAwesome from '@expo/vector-icons/FontAwesome'

import Dashboard from './src/Views/Dashboard'
import Login from './src/Views/Login'
import Profile from './src/Views/Profile'
import PasswordRecovery from './src/Views/PasswordRecovery'
import Register from './src/Views/Register'
import Settings from './src/Views/Settings'

LogBox.ignoreLogs(['EventEmitter.removeListener'])
const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function HomePage() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName
          size = 24

          if (route.name === 'Dashboard') {
            iconName = focused ? 'home' : 'home'
          } else if (route.name === 'Profile') {
            iconName = focused ? 'user' : 'user'
          } else if (route.name === 'Settings') {
            iconName = focused ? 'gear' : 'gear'
          }
          return <FontAwesome name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: '#4A4E69',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
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
    }, 100)
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
        <Stack.Navigator>
          {userToken !== null ? (
            <Stack.Group>
              <Stack.Screen
                name="HomePage"
                component={HomePage}
                options={{ headerShown: false }}
              />
            </Stack.Group>
          ) : (
            <Stack.Group>
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
            </Stack.Group>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  )
}

export default App
