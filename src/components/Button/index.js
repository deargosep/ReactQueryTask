import React from 'react'
import { ActivityIndicator, Button } from 'react-native-paper'
import { useTheme } from 'theme'
import styles from './styles'

const ButtonMD = ({
  handlePress = () => {},
  text,
  sub,
  disabled,
  mode = 'contained',
  small,
  otherStyles,
  isLoading,
  otherLabelStyles
}) => {
  const { Colors } = useTheme()

  return (
    <Button
      color={sub ? Colors.btn.subBtn : Colors.main}
      labelStyle={styles(disabled, mode, small, otherLabelStyles).labelStyle}
      mode={mode}
      onPress={() => {
        if (!disabled) handlePress()
      }}
      style={{
        borderRadius: small ? 16 : 8,
        ...otherStyles
      }}
      contentStyle={{
        height: small ? 35 : 52,
        width: '100%'
      }}
      disabled={disabled}
      loading={isLoading}
    >
      {text}
    </Button>
  )
}

export default ButtonMD
