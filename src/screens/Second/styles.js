import { StyleSheet } from 'react-native'
import { useTheme } from 'theme'

const styles = () => {
  const { Colors, Layout, Font } = useTheme()

  return StyleSheet.create({
    page: {
      ...Layout.justifyContentBetween
    }
  })
}

export default styles
