import React, { useEffect, useMemo, useState } from 'react'
import { ActivityIndicator, LogBox, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { firebase } from './src/config/firebase'
import { Octicons } from '@expo/vector-icons'
LogBox.ignoreLogs(['EventEmitter.removeListener'])

// Importing Screens
import Dashboard from './src/views/Dashboard'
import Login from './src/views/Login'
import Profile from './src/views/Profile'
import PasswordRecovery from './src/views/PasswordRecovery'
import Register from './src/views/Register'
import Settings from './src/views/Settings'
import AddUser from './src/views/AddUser'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function HomePage() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName
          size = 20

          if (route.name === 'Dashboard') {
            iconName = focused ? 'home' : 'home'
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person'
          } else if (route.name === 'Settings') {
            iconName = focused ? 'gear' : 'gear'
          }
          return <Octicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: '#4A4E69',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: true,
        tabBarStyle: {
          minHeight: 64,
          paddingTop: 10,
          paddingBottom: 12,
          shadowColor: '#fff',
        },
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ title: 'Página Inicial' }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ title: 'Perfil' }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{ title: 'Configurações' }}
      />
    </Tab.Navigator>
  )
}

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [userToken, setUserToken] = useState(null)

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((userToken) => {
      const token = firebase.auth().currentUser
      setUserToken(token)
      console.log('user login token:', userToken)
      if (isLoading) {
        setIsLoading(false)
      }
    })
    return unsubscribe
  }, [])

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#22223b" />
      </View>
    )
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userToken !== null ? (
          <Stack.Group>
            <Stack.Screen
              name="HomePage"
              component={HomePage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AddUser"
              component={AddUser}
              options={{ title: 'Adicionar um amigo' }}
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
  )
}

export default App
