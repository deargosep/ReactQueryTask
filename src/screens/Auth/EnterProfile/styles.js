import { StyleSheet } from 'react-native'
import { useTheme } from '@theme'

const styles = () => {
  const { Colors, Layout, Font } = useTheme()

  return StyleSheet.create({
    text: {
      ...Font(400, 'title', Colors.black)
    },
    uploadPhoto: {
      ...Font(400, 'title', Colors.main)
    },
    photo: {
      ...Layout.rowCenter
    },
    fullProfile: {
      height: '100%',
      justifyContent: 'space-between'
    },
    photoForFullProfile: {
      ...Layout.colVCenter
    },
    avatarForFullProfile: {
      borderRadius: 100,
      height: 150,
      width: 150
    },
    policyText: {
      ...Layout.textCenter,
      ...Font(400, 'small', Colors.black)
    },
    policyActionText: {
      ...Font(400, 'small', Colors.main)
    },
    avatar: {
      width: 60,
      height: 60,
      marginRight: 20,
      borderRadius: 30
    },
    avatarError: {
      ...Layout.textCenter
    }
  })
}

export default styles
