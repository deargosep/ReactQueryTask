import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TabNavigator from './TabNavigator'
import AuthNavigator from './Nested/AuthNavigator'
import { useDispatch, useSelector } from 'react-redux'
import {
  currentUserLoadingSelector,
  currentUserSelector
} from '@store/selectors/auth'
import { getCurrentUser } from '@store/modules/auth/actions'
import EnterProfile from '@screens/Auth/EnterProfile'

const Stack = createNativeStackNavigator()

const AppRouter = () => {
  const dispatch = useDispatch()

  const currentUser = useSelector(currentUserSelector)
  const isLoading = useSelector(currentUserLoadingSelector)

  useEffect(() => {
    dispatch(
      getCurrentUser(
        {},
        () => {
          SplashScreen.hide()
        },
        () => {
          SplashScreen.hide()
        }
      )
    )
  }, [])

  if (isLoading) return null
  if (currentUser && (currentUser.fullName || currentUser.photo)) {
    return (
      <Stack.Navigator
        initialRouteName="Tabs"
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Tabs" component={TabNavigator} />
      </Stack.Navigator>
    )
  } else if (!currentUser) {
    return (
      <Stack.Navigator
        initialRouteName="Auth"
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen
          name="Auth"
          component={AuthNavigator}
          options={({ route, navigation }) => ({
            headerShown: false
          })}
        />
      </Stack.Navigator>
    )
  } else if (currentUser && (!currentUser.fullName || !currentUser.photo)) {
    return (
      <Stack.Navigator
        initialRouteName={'EnterProfile'}
        screenOptions={{ headerTitleAlign: 'center' }}
      >
        <Stack.Screen
          name="EnterProfile"
          component={EnterProfile}
          // options={({ route, navigation }) => ({
          //   // ...Header(route, navigation)
          // })}
        />
      </Stack.Navigator>
    )
  }
}

export default AppRouter
