import { StyleSheet } from 'react-native'
import { useTheme } from 'theme'

const styles = (open, formik, fieldName) => {
  const { Colors, Variables } = useTheme()

  return StyleSheet.create({
    listItemContainer: {
      height: 56,
      paddingHorizontal: 0,
      borderTopWidth: 1,
      borderColor: Colors.main,
      marginHorizontal: 14
    },
    text: {
      fontSize: Variables.fonts.size.regular
    },
    wrapper: {
      borderColor:
        formik?.touched[fieldName] && formik?.errors[fieldName]
          ? Colors.error
          : open
          ? Colors.main
          : Colors.noSelect,
      height: 56,
      paddingHorizontal: 14,
      borderRadius: 8,
      borderWidth:
        formik?.touched[fieldName] && formik?.errors[fieldName] ? 2 : 1
    },
    dropDownContainer: {
      borderColor: Colors.main,
      borderWidth: 0,
      borderLeftWidth: 1,
      borderBottomWidth: 1,
      borderRightWidth: 1,
      elevation: 2
    }
  })
}

export default styles
