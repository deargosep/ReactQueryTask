import { StyleSheet } from 'react-native'
import { useTheme } from 'theme'

const styles = () => {
  const { Colors, Layout, Font } = useTheme()

  return StyleSheet.create({
    container: {
      ...Layout.justifyContentCenter
    },
    title: {
      ...Font(600, 'large', Colors.black)
    },
    text: {
      ...Font(400, 'title', Colors.black),
      paddingVertical: 20
    }
  })
}

export default styles
