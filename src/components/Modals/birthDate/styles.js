import { StyleSheet } from 'react-native'
import { useTheme } from '@theme'

const styles = () => {
  const { Colors, Layout, Font } = useTheme()

  return StyleSheet.create({
    page: {
      ...Layout.fill,
      padding: 24
    }
  })
}

export default styles
