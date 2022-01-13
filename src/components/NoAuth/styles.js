import { StyleSheet } from 'react-native'
import { useTheme } from 'theme'

const styles = () => {
  const { Colors, Layout, Font } = useTheme()

  return StyleSheet.create({
    container: {
      ...Layout.fill,
      ...Layout.colVCenter,
      ...Layout.justifyContentCenter
    },
    text: {
      ...Font(400, 'regular', Colors.black),
      marginBottom: 50,
      ...Layout.textCenter
    }
  })
}

export default styles
