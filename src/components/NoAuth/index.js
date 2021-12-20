import React from 'react'
import { View, Text } from 'react-native'
import { useTheme } from '@theme'
import styles from './styles'
import ButtonMD from '@components/Button'
import { useTranslation } from 'react-i18next'

const NoAuth = ({ text }) => {
  const { t } = useTranslation()

  return (
    <View style={styles().container}>
      <Text style={styles().text}>{text}</Text>
      <ButtonMD handlePress={() => console.log(1)} text={t('noAuth.button')} />
    </View>
  )
}

export default NoAuth
