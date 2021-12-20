import React from 'react'
import { SafeAreaView } from 'react-native'
import FocusAwareStatusBar from '@utils/focusAwareStatusBar'
import { useTheme } from '@theme'
import NoAuth from './NoAuth'

const Wrapper = ({
  children,
  noPadding,
  otherStyles,
  secure,
  beforeAuthText
}) => {
  const { Variables, Layout, Colors } = useTheme()

  const isSignIn = false

  return (
    <SafeAreaView
      style={[
        {
          paddingHorizontal: noPadding ? 0 : 24,
          ...Layout.fill,
          backgroundColor: Colors.white,
          ...otherStyles
        }
      ]}
    >
      <FocusAwareStatusBar barStyle="dark-content" backgroundColor={'white'} />
      {secure && !isSignIn ? <NoAuth text={beforeAuthText} /> : children}
    </SafeAreaView>
  )
}

export default Wrapper
