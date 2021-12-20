import React from 'react'
import { View } from 'react-native'

const Spacer = ({ size, horizontal, bottom }) => {
  return (
    <View
      style={
        horizontal
          ? { marginLeft: size }
          : bottom
          ? { marginBottom: size, flexShrink: 0 }
          : { marginTop: size, flexShrink: 0 }
      }
    />
  )
}

export default Spacer
