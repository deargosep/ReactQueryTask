import { StyleSheet } from 'react-native'
import { useTheme } from '@theme'

const styles = () => {
  const { Colors, Layout, Font } = useTheme()

  return StyleSheet.create({
    page: {
      padding: 24,
      ...Layout.fill,
      ...Layout.column,
      ...Layout.justifyContentBetween
    },
    title: {
      ...Layout.textCenter,
      marginTop: 8,
      ...Font(600, 'regular', Colors.black)
    },
    buttonWrapper: {
      marginBottom: 8,
      ...Layout.row,
      ...Layout.justifyContentAround
    },
    button: {
      width: 128,
      borderRadius: 8
    },
    buttonColored: {
      backgroundColor: Colors.main
    },
    buttonTextColored: {
      color: Colors.white
    },
    buttonText: {
      ...Font(600, 'regular', Colors.black)
    }
  })
}

export default styles
