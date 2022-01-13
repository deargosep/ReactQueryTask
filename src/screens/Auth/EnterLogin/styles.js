import { StyleSheet } from 'react-native'
import { useTheme } from 'theme'

const styles = () => {
  const { Colors, Layout, Font } = useTheme()

  return StyleSheet.create({
    title: {
      ...Font(600, 'biggest', Colors.black)
    },
    text: {
      ...Font(400, 'title', Colors.black)
    }
  })
}

export default styles
