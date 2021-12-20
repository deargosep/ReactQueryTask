import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import First from '../screens/First'
import Second from '../screens/Second'

const Tab = createBottomTabNavigator()

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="First"
      screenOptions={{
        headerShown: false
      }}
    >
      <Tab.Screen
        name="First"
        component={First}
        options={({ route }) => ({
          tabBarLabel: 'First'
        })}
      />
      <Tab.Screen
        name="Secong"
        component={Second}
        options={({ route }) => ({
          tabBarLabel: 'Second'
        })}
      />
    </Tab.Navigator>
  )
}

export default TabNavigator
