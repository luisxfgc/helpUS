import * as React from 'react'
import { TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { auth } from './src/config/firebase'
import Login from './src/views/Login'
import Dashboard from './src/views/Dashboard'
import Register from './src/views/Register'
import PasswordRecovery from './src/views/PasswordRecovery'

const Stack = createNativeStackNavigator()

function App({ navigation }) {
  return (
    <NavigationContainer>
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
        <Stack.Screen name="PasswordRecovery" component={PasswordRecovery} />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={() => {
            return {
              headerRight: () => (
                <TouchableOpacity
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