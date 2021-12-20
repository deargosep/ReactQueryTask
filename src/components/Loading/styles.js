import { StyleSheet } from 'react-native'
import { useTheme } from '@theme'

const styles = () => {
  const { Colors, Layout, Font } = useTheme()

  return StyleSheet.create({
    wrapper: {
      flex: 1,
      justifyContent: 'center'
    }
  })
}

export default styles
