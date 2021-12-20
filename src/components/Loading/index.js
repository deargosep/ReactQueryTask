import React from 'react'
import { View, Text } from 'react-native'
import styles from './styles'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@theme'
import { ActivityIndicator } from 'react-native-paper'

const Loading = () => {
  const { t } = useTranslation()
  const { Colors } = useTheme()

  return (
    <View style={styles().wrapper}>
      <ActivityIndicator animating={true} color={Colors.main} size={40} />
    </View>
  )
}

export default Loading
