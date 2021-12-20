import { StyleSheet } from 'react-native'
import { useTheme } from '@theme'

const styles = () => {
  const { Colors, Layout, Font } = useTheme()

  return StyleSheet.create({
    container: {
      ...Layout.colVCenter,
      ...Layout.justifyContentBetween,
      paddingTop: 40
    },
    actions: {
      marginBottom: 40,
      width: '100%'
    },
    image: {
      height: 92,
      width: '80%'
    }
  })
}

export default styles
