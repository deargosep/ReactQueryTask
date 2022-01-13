import { StyleSheet } from 'react-native'
import { useTheme } from 'theme'

const styles = () => {
  const { Colors, Layout, Font } = useTheme()

  return StyleSheet.create({
    page: {
      ...Layout.fill,
      padding: 24
    },
    separator: {
      borderBottomWidth: 1,
      borderBottomColor: Colors.black,
      opacity: 0.08,
      marginTop: 14,
      marginBottom: 14
    },
    header: {
      ...Layout.rowCenter
    },
    title: {
      ...Font(600, 'regular', Colors.black)
    },
    closeIcon: {
      height: 24,
      width: 24
    },
    close: {
      position: 'absolute',
      right: 0,
      top: 0
    },
    langName: {
      ...Font(400, 'regular', Colors.black)
    },
    langCode: {
      ...Font(400, 'regular', Colors.black)
    },
    langsWrapper: {
      marginTop: 28
    },
    langWrapper: {
      ...Layout.row,
      ...Layout.justifyContentBetween,
      height: 44,
      padding: 8,
      borderRadius: 8
    },
    activeLangWrapper: {
      backgroundColor: Colors.activeLang
    },
    activeLangCode: {
      borderBottomColor: Colors.black,
      borderBottomWidth: 1
    }
  })
}

export default styles
