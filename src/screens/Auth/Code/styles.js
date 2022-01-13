import { StyleSheet } from 'react-native'
import { useTheme } from 'theme'

const styles = (isResendCode, error) => {
  const { Colors, Layout, Font } = useTheme()

  return StyleSheet.create({
    text: {
      ...Font(400, 'title', Colors.black)
    },
    phoneNumber: {
      ...Layout.colVCenter
    },
    phoneNumberValue: {
      ...Font(600, 'regular', Colors.black)
    },
    action: {
      ...Font(400, 'small', isResendCode ? Colors.noSelect : Colors.main),
      ...Layout.textCenter
    },
    codeFieldRoot: {
      marginHorizontal: 35
    },
    cellRoot: {
      width: 50,
      height: 50,
      ...Layout.alignItemsCenter,
      ...Layout.justifyContentCenter,
      borderBottomColor: error ? Colors.error : Colors.noSelect,
      borderBottomWidth: 1
    },
    cellText: {
      ...Font(600, 'biggest', Colors.black),
      ...Layout.textCenter
    },
    focusCell: {
      borderBottomColor: error ? Colors.error : Colors.underlineColor,
      borderBottomWidth: 1
    },
    error: {
      ...Font(400, 'small', Colors.error),
      ...Layout.textCenter
    }
  })
}

export default styles
