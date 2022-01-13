import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Start from 'screens/Auth/Start'
import Choose from 'screens/Auth/Choose'
import EnterLogin from 'screens/Auth/EnterLogin'
import Code from 'screens/Auth/Code'
// import EnterProfile from 'screens/Auth/EnterProfile'
import { Header } from 'router/Header'
import EnterProfile from 'screens/Auth/EnterProfile'
const Stack = createNativeStackNavigator()

const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={'Start'}>
      <Stack.Screen
        name="Start"
        component={Start}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Choose"
        component={Choose}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="EnterLogin"
        component={EnterLogin}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Code"
        component={Code}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  )
}

export default AuthNavigator
