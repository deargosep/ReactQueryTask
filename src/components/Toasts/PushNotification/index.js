import React from 'react'
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity
} from 'react-native'
import styles from './styles'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@theme'
import Spacer from '@components/Spacer'
import Toast from 'react-native-toast-message'
import { messageHander } from '@utils/firebase/notificationMessageHandler'

const PushNotification = ({ internalState }) => {
  const { t } = useTranslation()
  const { Images } = useTheme()
  // const navigation = useNavigation()

  const goToPush = () => {
    Toast.hide()
    // messageHander(internalState.text2, false, navigation, t)
  }

  return (
    <TouchableWithoutFeedback>
      <View style={styles().container}>
        <Image
          source={Images.logo}
          style={{
            width: 97,
            height: 32,
            marginRight: 20
          }}
        />
        <Spacer size={20} vertical />
        <View style={styles().textContainer}>
          <Text style={[styles().title]}>{internalState.text1}</Text>
          <Spacer size={10} />
          <Text style={styles().description}>{internalState.text2}</Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={(e) => {
            e.stopPropagation()
            Toast.hide()
          }}
          style={styles().closeBtn}
        >
          {/* <Image
            source={Images.close}
            style={{
              width: 15,
              height: 20,
              marginLeft: 5
            }}
          /> */}
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default PushNotification
