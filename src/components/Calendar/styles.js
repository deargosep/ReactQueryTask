import { StyleSheet } from 'react-native'
import { useTheme } from '@theme'
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from 'react-native-responsive-dimensions'

const styles = (mode, currentPickerMode, day) => {
  const { Colors, Layout, Font, FontAdapt } = useTheme()

  const SELECT_ITEM_HEIGHT = 34
  const SELECT_ITEM_MARGIN = 6

  const calculateColor = () => {
    if (day?.pickedDay) return Colors.white
    if (!day?.active) return Colors.calendar.notActive
    return Colors.black
  }

  return StyleSheet.create({
    monthYearContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: responsiveWidth(75),
      justifyContent: 'space-between'
    },
    arrows: {
      width: 16,
      height: 16,
      marginLeft: 8
    },
    controlArrow: {
      width: 20,
      height: 15
    },
    dayName: {
      width: responsiveWidth(11),
      height: responsiveHeight(4),
      ...FontAdapt(200, responsiveFontSize(1.7), Colors.calendar.days),
      ...Layout.textCenter
    },
    dayNumberContainer: {
      width: responsiveWidth(11),
      height: responsiveHeight(5),
      marginBottom: 5,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: day?.pickedDay ? Colors.main : 'white',
      borderRadius: day?.pickedDay || day?.currentDay ? 6 : 0,
      borderWidth: day?.currentDay ? 1 : 0,
      borderColor: day?.currentDay ? Colors.main : Colors.white
    },
    dayNumber: {
      ...FontAdapt(400, responsiveFontSize(1.7), calculateColor())
    },
    event: {
      width: 8,
      height: 8,
      backgroundColor: Colors.underlineColor,
      borderRadius: 30,
      position: 'absolute',
      zIndex: 5,
      borderWidth: 1,
      top: 24,
      left: 13,
      borderColor: Colors.white
    },
    selected: {
      backgroundColor:
        currentPickerMode && mode && mode === currentPickerMode
          ? Colors.calendar.selectedActive
          : Colors.calendar.selected,
      borderRadius: 6,
      justifyContent: 'center',
      flexDirection: 'row',
      paddingHorizontal: 8,
      alignItems: 'center',
      height: responsiveHeight(4)
    },
    selectedText: {
      ...FontAdapt(400, responsiveFontSize(2), Colors.black)
    },
    selectWrapper: {
      height: (SELECT_ITEM_HEIGHT + SELECT_ITEM_MARGIN - 1) * 6
    },
    selectItemsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      // marginHorizontal: '12%',
      flexGrow: 1
    },
    selectItemContainer: {
      backgroundColor: 'red',
      height: SELECT_ITEM_HEIGHT,
      width: 80,
      justifyContent: 'center',
      backgroundColor: Colors.calendar.selected,
      borderRadius: 6,
      margin: SELECT_ITEM_MARGIN
    },
    selectItemText: {
      ...Font(400, 'title', Colors.black),
      ...Layout.textCenter
    }
  })
}

export default styles
