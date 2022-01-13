import { StyleSheet } from 'react-native'
import { useTheme } from 'theme'

const styles = () => {
  const { Colors, Layout, Font } = useTheme()

  return StyleSheet.create({
    sortWrapper: {
      ...Layout.rowHCenter,
      ...Layout.justifyContentBetween,
      marginTop: 8
    },
    sort: {
      ...Font(400, 'title', 'black'),
      opacity: 0.5,
      ...Layout.fill
    },
    filterIcon: {
      height: 32,
      width: 32
    }
  })
}

export default styles
