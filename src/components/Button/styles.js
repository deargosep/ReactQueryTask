import { StyleSheet } from 'react-native'
import { useTheme } from 'theme'

const styles = (disabled, mode, small, otherLabelStyles) => {
  const { Colors, Font } = useTheme()

  const calculateColor = () => {
    if (mode === 'text') {
      if (!disabled) return '#22509D'
      else return Colors.btn.textBtnDisabledText
    }
    return Colors.white
  }

  return StyleSheet.create({
    labelStyle: {
      ...Font(600, small ? 'small' : 'regular', calculateColor()),
      textTransform: 'none',
      ...otherLabelStyles
    }
  })
}

export default styles
