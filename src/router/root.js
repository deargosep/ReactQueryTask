import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import AppRouter from './AppRouter'

const AppRoot = () => {
  return (
    <NavigationContainer>
      <AppRouter />
    </NavigationContainer>
  )
}

export default AppRoot
