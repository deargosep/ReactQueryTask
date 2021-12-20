import { StyleSheet } from 'react-native'
import { useTheme } from '@theme'

const styles = () => {
  const { Colors, Layout, Font } = useTheme()

  return StyleSheet.create({
    container: {
      backgroundColor: 'red',
      paddingHorizontal: 12,
      paddingVertical: 10,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: Colors.white,
      // shadowColor: Colors.main,
      width: '95%',
      borderRadius: 10,
      shadowOffset: {
        width: 0,
        height: 10
      },
      shadowOpacity: 0.9,
      shadowRadius: 20.65,

      elevation: 5,
      marginTop: 10
    },
    textContainer: {
      flexGrow: 1,
      flexShrink: 1
    },
    title: {
      ...Font(600, 'title', Colors.black)
    },
    description: {
      ...Font(400, 'small', Colors.black)
    },
    closeBtn: {
      height: '100%',
      justifyContent: 'center'
    }
  })
}

export default styles
