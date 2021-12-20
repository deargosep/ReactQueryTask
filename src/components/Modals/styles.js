import { StyleSheet } from 'react-native'
import { useTheme } from '@theme'

const styles = () => {
  const { Colors, Layout, Font } = useTheme()

  return StyleSheet.create({
    modal: {
      ...Layout.fill,
      borderRadius: 10,
      backgroundColor: Colors.white
    }
  })
}

export default styles
