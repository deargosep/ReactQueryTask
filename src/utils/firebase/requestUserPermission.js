import messaging from '@react-native-firebase/messaging'
import { messageHander } from './notificationMessageHandler'
import { showToast } from './showPushInApp'

export const requestUserPermission = async (
  navigation,
  t,
  setIsLoadingPush
) => {
  const authStatus = await messaging().requestPermission()
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL

  if (enabled) {
    console.log('Authorization status:', authStatus)

    messaging().onMessage(async (remoteMessage) => {
      console.log(remoteMessage)
      showToast('pushNotification', 0, { message: remoteMessage, navigation })
    })

    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage
      )
      messageHander(remoteMessage, false, navigation, t)
    })

    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage
          )
          messageHander(remoteMessage, true, navigation, t)
        }
      })
      .then(() => setIsLoadingPush(false))
  }
}
